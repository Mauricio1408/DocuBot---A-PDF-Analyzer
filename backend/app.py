# backend/app.py

from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pdfplumber
import spacy
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
import numpy as np
import spacy

# Only allow PDF files
ALLOWED_EXTENSIONS = {"pdf"}

app = Flask(__name__)
CORS(app)  # Enable CORS for all endpoints

def allowed_file(filename):
    """Check if the uploaded file has a permitted extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# === NLP Processing Functions ===

# Load spaCy transformer model (this may take some time on first load)
nlp = spacy.load("en_core_web_trf")

def clean_text(text):
    text = re.sub(r"•", "", text)
    text = re.sub(r"[^\x00-\x7F]+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def extract_text_from_pdf(file):
    with pdfplumber.open(file) as pdf:
        text = ""
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    return clean_text(text)

def get_nlp(use_custom_model=False):
    if use_custom_model:
        nlp = spacy.load(r'C:\Users\Mauricio\Documents\3rd Year 2nd Semester\Natural Language Processing\docubot_backend\docubot\output_ner_model_two\model-best')
        # Add sentencizer if not present
        if "sentencizer" not in nlp.pipe_names:
            nlp.add_pipe("sentencizer")
        return nlp
    else:
        return spacy.load("en_core_web_trf")

def perform_ner(text, nlp):
    """Perform named entity recognition using spaCy."""
    doc = nlp(text)
    return {
        "people": [ent.text for ent in doc.ents if ent.label_ == "PERSON"],
        "places": [ent.text for ent in doc.ents if ent.label_ in {"GPE", "LOC"}],
        "organizations": [ent.text for ent in doc.ents if ent.label_ == "ORG"]
    }

def get_relevant_chunks(query, text, nlp, num_chunks=5):
    sentences = [sent.text.strip() for sent in nlp(text).sents if len(sent.text.strip()) > 10]
    vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform(sentences + [query])
    cosine_sim = cosine_similarity(tfidf_matrix[-1:], tfidf_matrix[:-1])
    indices = cosine_sim.argsort()[0, -num_chunks:][::-1]
    return [sentences[i] for i in indices]

def deduplicate(sentences):
    seen = set()
    result = []
    for s in sentences:
        s = s.strip()
        if s not in seen:
            seen.add(s)
            result.append(s)
    return result

def is_too_technical(s):
    return s.count("=") > 3 or len(s) > 300

def is_tabular(s):
    return bool(re.match(r'^\d', s)) or len(re.findall(r'\d+', s)) > 6

def shorten(s, limit=250):
    return s if len(s) <= limit else s[:limit].rsplit(" ", 1)[0] + "..."

def filter_summary(summary):
    """Filter out duplicate, overly technical, or likely tabular sentences and shorten them if needed."""
    return [shorten(s) for s in deduplicate(summary) if not is_too_technical(s) and not is_tabular(s)]

def summarize_text(text, num_sentences=10):
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = TextRankSummarizer()
    summary = summarizer(parser.document, num_sentences)
    return filter_summary([str(sentence) for sentence in summary])

def analyze_pdf(file, query, use_custom_model=False):
    nlp = get_nlp(use_custom_model)
    text = extract_text_from_pdf(file)
    entities = perform_ner(text, nlp)
    if query and query.strip():
        chunks = get_relevant_chunks(query, text, nlp)
    else:
        chunks = []
    summary = summarize_text(text)
    return {
        "entities": entities,
        "relevant_chunks": chunks,
        "summary": summary
    }

# === Endpoints ===

@app.route("/api/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file format"}), 400

    query = request.form.get("query", "")
    use_custom_model = request.form.get("use_custom_model", "false").lower() == "true"

    try:
        result = analyze_pdf(file, query, use_custom_model)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500


# Optionally, you can add additional endpoints here for separate functionalities (if desired).
# For example, an endpoint that only performs search on a previously processed PDF.

if __name__ == "__main__":
    app.run(debug=True)
