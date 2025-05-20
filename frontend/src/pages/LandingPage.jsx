import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from '../graphics/data-report.png'; // Adjust the path as necessary
import methodologyIcon from '../graphics/methodology.png'; // Adjust the path as necessary
import robotIcon from '../graphics/robot.png'; // Adjust the path as necessary

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or default to false
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <>
      {/* Hero Section */}
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center text-gray-900 dark:text-white relative"
        style={{
          backgroundColor: darkMode ? '#2F3438' : '#F1F1EF'
        }}
      >
        {/* Dark mode toggle button */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="absolute top-6 right-8 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition font-inter"
          aria-label="Toggle dark mode"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <div className="text-center p-8">
        <img
        src={robotIcon}
        alt="Robot Icon"
        className="mx-auto mb-6 w-80 h-80 object-contain"
        />
          <h1 className="text-7xl font-bold mb-4 font-nunito">Welcome to Docubot</h1>
          <p className="text-lg mb-6 font-inter">
            Docubot is a lightweight, efficient, and interpretable PDF document analysis tool built for academic and technical materials.
          </p>
        </div>
      </div>

      {/* Core Features Section */}
      <section
        className="min-h-screen w-full flex items-center text-gray-900 dark:text-white"
        style={{
          backgroundColor: darkMode ? '#2F3438' : '#F1F1EF'
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto px-4 gap-8">
          {/* Left: Graphic/Image */}
          <div className="flex-1 flex items-center justify-center mb-8 md:mb-0">
            {/* Replace the src below with your actual image or SVG */}
            <img
              src={arrowIcon}
              alt="PDF Analysis Graphic"
              className="w-64 h-64 object-contain"
            />
          </div>
          {/* Right: Texts */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 font-nunito">Core Features</h2>
            <ul className="list-disc pl-8 space-y-2 font-inter">
              <li>Automatic PDF parsing and entity extraction</li>
              <li>Summarization of academic and technical documents</li>
              <li>Highlighting of relevant content chunks</li>
              <li>Dark/light mode support for comfortable reading</li>
            </ul>
          </div>
        </div>
      </section>

       {/* Methodologies Section */}
      <section
        className="min-h-screen w-full flex items-center text-gray-900 dark:text-white"
        style={{
          backgroundColor: darkMode ? '#2F3438' : '#F1F1EF'
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto px-4 gap-8">
          {/* Left: Texts */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 font-nunito">Methodologies</h2>
            <ul className="list-disc pl-8 space-y-2 font-inter">
              <li>Named Entity Recognition (NER) using spaCy</li>
              <li>Text summarization with transformer-based models</li>
              <li>Chunking and relevance scoring for document sections</li>
              <li>Customizable pipelines for different document types</li>
            </ul>
          </div>
          {/* Right: Graphic/Image */}
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            {/* Replace the src below with your actual image or SVG */}
            <img
              src={methodologyIcon}
              alt="Methodology Graphic"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section
        className="min-h-screen w-full flex flex-col items-center justify-center text-gray-900 dark:text-white"
        style={{
          backgroundColor: darkMode ? '#2F3438' : '#F1F1EF'
        }}
      >
        <div className="w-full max-w-4xl px-4">
          <h2 className="text-4xl font-bold mb-10 text-center font-nunito">How Docubot Works</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 font-inter">
              <thead>
                <tr>
                  <th className="bg-gray-300 dark:bg-gray-700 text-left px-6 py-4 font-bold text-lg border-b-2 border-gray-400 dark:border-gray-600 font-nunito">Feature</th>
                  <th className="bg-gray-300 dark:bg-gray-700 text-left px-6 py-4 font-bold text-lg border-b-2 border-gray-400 dark:border-gray-600 font-nunito">What It Does</th>
                  <th className="bg-gray-300 dark:bg-gray-700 text-left px-6 py-4 font-bold text-lg border-b-2 border-gray-400 dark:border-gray-600 font-nunito">NLP Task</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-nunito">PDF Upload</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-inter">Accepts and parses a PDF</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-inter">Preprocessing</td>
                </tr>
                <tr>
                  <td className="font-bold px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-nunito">Named Entity<br/>Tagger</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-inter">Highlights key entities (e.g., people, dates)</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-inter">Named Entity<br/>Recognition</td>
                </tr>
                <tr>
                  <td className="font-bold px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-nunito">Document<br/>Search</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-inter">Allows users to ask factual questions</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 font-inter">Question Answering<br/>(extractive)</td>
                </tr>
                <tr>
                  <td className="font-bold px-6 py-4 font-nunito">Summary<br/>Generator</td>
                  <td className="px-6 py-4 font-inter">Returns top relevant sentences from a document</td>
                  <td className="px-6 py-4 font-inter">Summarization<br/>(extractive)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Try Demo Section */}
      <section
        className="min-h-screen w-full flex items-center justify-center"
        style={{
          // Opposite background: light in dark mode, dark in light mode
          backgroundColor: darkMode ? '#F1F1EF' : '#2F3438'
        }}
      >
        <div className="text-center w-full">
          <h2 className={`text-3xl font-bold mb-8 font-nunito ${darkMode ? 'text-gray-900' : 'text-white'}`}>Ready to try Docubot?</h2>
          <Link
            to="/demo"
            className={`
              px-8 py-4 rounded text-xl transition font-inter
              ${darkMode 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-white text-black hover:bg-gray-200 border border-gray-300'
              }
            `}
            style={{ fontWeight: 700 }}
          >
            Try the Demo
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;