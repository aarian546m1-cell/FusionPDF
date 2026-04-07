import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FileUp, FileCheck } from 'lucide-react';

export default function PDFToWord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/pdf-to-word', formData, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name.replace('.pdf', '') + '.docx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Conversion failed", error);
        alert('Failed to convert PDF. Ensure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center flex items-center justify-center gap-3">
            <FileUp className="text-primary w-10 h-10" /> PDF to Word
        </h1>
        <p className="text-gray-600 text-lg">
            Upload your PDF and transform it into an editable Word Document while retaining formatting.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-2xl bg-white border-2 border-dashed border-primary/40 rounded-2xl flex flex-col items-center justify-center p-16 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
          >
            <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept=".pdf" 
                onChange={(e) => setFile(e.target.files[0])} 
            />
            {file ? (
                <>
                    <FileCheck className="text-green-600 w-16 h-16 mb-4" />
                    <p className="text-2xl font-semibold text-gray-900">{file.name}</p>
                    <p className="text-gray-500 mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
            ) : (
                <>
                    <FileUp className="text-gray-400 w-16 h-16 mb-4" />
                    <p className="text-2xl font-semibold text-gray-700">Click to upload PDF</p>
                    <p className="text-gray-500 mt-2">or drag and drop here</p>
                </>
            )}
          </div>

          <button 
                onClick={handleConvert}
                disabled={!file || loading}
                className="mt-8 bg-primary hover:bg-accent text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center gap-3"
            >
                {loading ? 'Converting PDF...' : 'Convert to .Docx'}
          </button>
      </div>
    </div>
  );
}
