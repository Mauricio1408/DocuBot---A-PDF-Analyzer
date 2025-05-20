// src/components/PDFUploader.jsx
import React, { useState, useRef } from 'react';

const PDFUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [useCustomModel, setUseCustomModel] = useState(false);

  // Handle file selection.
  const handleFileChange = (e) => {
    setError('');
    const selected = e.target.files[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setError('Sorry, your file format is unsupported.');
      return;
    }
    setFile(selected);
  };

  // Handle file upload submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    // Add the query (if provided) to the formData.
    if (query.trim()) {
      formData.append('query', query);
    }
    formData.append('use_custom_model', useCustomModel ? 'true' : 'false'); // <-- add this line

    try {
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.error || 'Upload failed');
    setUploading(false);
    return;
  }

  // Pass the analysis result to the parent component.
  onUploadSuccess(data);
} catch (err) {
  setError('File upload failed, please try again later.');
}
setUploading(false);
  };

// ...existing code...
  return (
    <div className="p-8 w-full max-w-2xl min-h-[400px] mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_40px_8px_rgba(0,0,0,0.25)] flex flex-col justify-center">
      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-dashed border-gray-300 p-10 rounded text-center mb-6 text-lg">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer">
            {file
              ? `Selected file: ${file.name}`
              : 'Drag and drop or click to select your PDF file'}
          </label>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter a query (optional)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded text-lg font-semibold transition bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Upload PDF
        </button>
        <label className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            checked={useCustomModel}
            onChange={e => setUseCustomModel(e.target.checked)}
          />
          <span>Use custom NER model</span>
</label>
      </form>
      {uploading && (
        <div className="mt-6 flex items-center justify-center">
          <span className="mr-2 text-lg">Uploading...</span>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );

};

export default PDFUploader;
