import React, { useState } from 'react';
import axios from 'axios';
import { Eraser, Download, FileText } from 'lucide-react';

export default function AIToDocs() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCleanFluff = () => {
    // Basic frontend clean to show user immediately
    let cleaned = text.replace(/^(?:\*\*(?:Sure|Certainly|Of course|Here is).*?\*\*|(?:Sure|Certainly|Of course|Here is|Here's).*?)(?:\:|\n+)/i, '');
    cleaned = cleaned.replace(/(?:(?:Please\s+)?let me know if you need(?: anything else| further assistance).*?|I hope this helps.*?)$/i, '');
    setText(cleaned.trim());
  };

  const handleExport = async (withClean = false) => {
    setLoading(true);
    try {
        // Assume backend runs on port 8000 locally
        const response = await axios.post('http://127.0.0.1:8000/api/ai-to-docs', {
            text: text,
            clean_fluff: withClean
        }, { responseType: 'blob' });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'GeneratedDocument.docx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Export failed", error);
        alert('Failed to generate document. Ensure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FileText className="text-primary" /> AI to Docs
        </h1>
        <p className="text-gray-600 font-medium text-lg">
            Paste your AI-generated text or Markdown below to instantly format it into a pristine Word Document.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl flex flex-col min-h-[500px] border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center px-6">
            <button 
                onClick={handleCleanFluff}
                className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors bg-white border border-gray-300 shadow-sm px-4 py-2 rounded-lg"
            >
                <Eraser size={18} /> Clean AI Fluff
            </button>
            <div className="flex gap-3">
                <button 
                    onClick={() => handleExport(false)}
                    disabled={!text || loading}
                    className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-md"
                >
                    <Download size={18} /> {loading ? 'Processing...' : 'Export Docx'}
                </button>
            </div>
        </div>

        {/* Text Area */}
        <textarea
            className="flex-1 w-full p-6 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-800 text-lg"
            placeholder="Paste your markdown right here... Use markdown like # Headers, **bold**, and bullet points."
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}
