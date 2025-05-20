import addIcon from '../graphics/add.png';
import commentaryIcon from '../graphics/commentary.png';
import dataReportIcon from '../graphics/data-report.png';
import React, { useState, useEffect } from 'react';
import PDFUploader from '../components/PDFUploader';

const DemoPage = () => {
  const [analysis, setAnalysis] = useState({
    entities: {},
    summary: [],
    relevant_chunks: []
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Collapsible state for each section
  const [showEntities, setShowEntities] = useState(true);
  const [showChunks, setShowChunks] = useState(true);
  const [showSummary, setShowSummary] = useState(true);

  const [useCustomModel, setUseCustomModel] = useState(false);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleUploadSuccess = (data) => {
    setAnalysis(data);
  };

  return (
    <div
      className="min-h-screen w-full text-gray-900 dark:text-white relative flex flex-col"
      style={{
        backgroundColor: darkMode ? '#2F3438' : '#F1F1EF'
      }}
    >
      {/* Dark mode toggle button */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-6 right-8 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        aria-label="Toggle dark mode"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Fixed header and uploader at the top, results scroll below */}
      <div className="w-full flex flex-col items-center justify-center pt-20 pb-12 bg-transparent z-10 mb-16">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mt-10">Docubot Demo</h1>
        </header>
        <div className="w-full max-w-5xl flex items-center justify-center">
          <PDFUploader onUploadSuccess={handleUploadSuccess} />
        </div>
      </div>

      
    <main className="flex-1 w-full flex flex-col items-center justify-start">
        <h1 className="text-3xl font-bold text-left w-full max-w-4xl mb-4">Results</h1>
        <div className="w-full max-w-4xl">
            {/* Named Entity Tagging Section */}
            {Object.keys(analysis.entities).length > 0 && (
                <section className="mt-12 w-full">
                    <button
                        className="w-full flex items-center justify-between text-xl font-medium mb-2 focus:outline-none transition-colors rounded px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowEntities((prev) => !prev)}
                        aria-expanded={showEntities}
                        aria-controls="entities-collapse"
                        type="button"
                    >
                        <span>Named Entities</span>
                        <span className="ml-2">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1549/1549454.png"
                                alt="Arrow"
                                className={`w-6 h-6 transition-transform duration-300 ${showEntities ? 'rotate-90' : 'rotate-0'}`}
                            />
                        </span>
                    </button>
                    <div
                        id="entities-collapse"
                        className={`overflow-hidden transition-all duration-500 ${showEntities ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="flex flex-row items-stretch bg-transparent mb-10">
                            {/* Image/Graphic */}
                                <div className="flex items-center justify-center w-1/4 min-w-[120px]">
                                    <img
                                        src={commentaryIcon}
                                        alt="People Graphic"
                                        className="w-40 h-40 object-contain"
                                    />
                                </div>
                            {/* Results Box */}
                            <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_0_40px_8px_rgba(0,0,0,0.25)] flex flex-col justify-center">
                                {Object.entries(analysis.entities).map(([entityType, entities], idx) => (
                                    <div key={idx} className="mb-2">
                                        <strong>{entityType.charAt(0).toUpperCase() + entityType.slice(1)}:</strong>
                                        <div className="mt-1">
                                            {entities.map((entity, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-2 py-1 mr-2 mb-2 rounded"
                                                >
                                                    {entity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Relevant Chunks Section */}
                        {analysis.relevant_chunks && analysis.relevant_chunks.length > 0 && (
                            <section className="mt-12 w-full mb-12">
                                <button
                                    className="w-full flex items-center justify-between text-xl font-medium mb-2 focus:outline-none transition-colors rounded px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setShowChunks((prev) => !prev)}
                                    aria-expanded={showChunks}
                                    aria-controls="chunks-collapse"
                                    type="button"
                                >
                                    <span>Relevant Chunks</span>
                                    <span className="ml-2">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/1549/1549454.png"
                                            alt="Arrow"
                                            className={`w-6 h-6 transition-transform duration-300 ${showChunks ? 'rotate-90' : 'rotate-0'}`}
                                        />
                                    </span>
                                </button>
                                <div
                                    id="chunks-collapse"
                                    className={`overflow-hidden transition-all duration-500 ${showChunks ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="flex flex-row items-stretch bg-transparent mb-10">
                                          {/* Image/Graphic */}
                                <div className="flex items-center justify-center w-1/4 min-w-[120px]">
                                    <img
                                        src={addIcon}
                                        alt="relevant chunks Graphic"
                                        className="w-32 h-32 object-contain"
                                    />
                                </div>
                            {/* Results Box */}
                            <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_0_40px_8px_rgba(0,0,0,0.25)] flex flex-col justify-center">
                                <ul className="list-disc pl-5">
                                    {analysis.relevant_chunks.map((chunk, idx) => (
                                        <li key={idx} className="mb-1">{chunk}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Summary Generation Section */}
            {analysis.summary && analysis.summary.length > 0 && (
                <section className="mt-12 w-full">
                    <button
                        className="w-full flex items-center justify-between text-xl font-medium mb-2 focus:outline-none transition-colors rounded px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowSummary((prev) => !prev)}
                        aria-expanded={showSummary}
                        aria-controls="summary-collapse"
                        type="button"
                    >
                        <span>Summary</span>
                        <span className="ml-2">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1549/1549454.png"
                                alt="Arrow"
                                className={`w-6 h-6 transition-transform duration-300 ${showSummary ? 'rotate-90' : 'rotate-0'}`}
                            />
                        </span>
                    </button>
                    <div
                        id="summary-collapse"
                        className={`overflow-hidden transition-all duration-500 ${showSummary ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="flex flex-row items-stretch bg-transparent mb-10">
                              {/* Image/Graphic */}
                                <div className="flex items-center justify-center w-1/4 min-w-[120px]">
                                    <img
                                        src={dataReportIcon}
                                        alt="Summary Graphic"
                                        className="w-32 h-32 object-contain"
                                    />
                                </div>
                            {/* Results Box */}
                            <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_0_40px_8px_rgba(0,0,0,0.25)] flex flex-col justify-center">
                                <ul className="list-disc pl-5">
                                    {analysis.summary.map((s, idx) => (
                                        <li key={idx} className="mb-1">{s}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    </main>
    </div>
  );
};

export default DemoPage;