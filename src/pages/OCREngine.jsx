import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ScanSearch, Image as ImageIcon } from 'lucide-react';

export default function OCREngine() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('eng+ben');
  const fileInputRef = useRef(null);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/ocr', formData, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'OCR_Extracted_Text.docx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("OCR failed", error);
        alert('Failed to perform OCR. Ensure Tesseract is installed and backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="mb-0 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center flex items-center justify-center gap-3">
            <ScanSearch className="text-primary w-10 h-10" /> OCR Engine
        </h1>
        <p className="text-gray-600 text-lg">
            Extract text from scannned PDFs or images in English and Bengali, exporting straight to Word.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mt-12 w-full max-w-3xl mx-auto">
          
          <div className="w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-12 cursor-pointer hover:bg-gray-100 transition-colors"
               >
                <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    accept="image/*,.pdf" 
                    onChange={(e) => setFile(e.target.files[0])} 
                />
                
                {file ? (
                    <>
                        <ImageIcon className="text-primary w-12 h-12 mb-3" />
                        <p className="text-xl font-semibold text-gray-800">{file.name}</p>
                    </>
                ) : (
                    <>
                        <ScanSearch className="text-gray-400 w-12 h-12 mb-3" />
                        <p className="text-xl font-semibold text-gray-700">Select Image / Scanned PDF</p>
                    </>
                )}
              </div>

              <div className="w-full mt-6">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">OCR Language Target</label>
                 <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-lg"
                 >
                    <option value="eng">English Only</option>
                    <option value="ben">Bengali Only</option>
                    <option value="eng+ben">English + Bengali (Dual Script)</option>
                 </select>
              </div>

              <button 
                  onClick={handleProcess}
                  disabled={!file || loading}
                  className="w-full mt-8 bg-primary hover:bg-accent text-white px-8 py-4 rounded-xl font-bold text-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {loading ? 'Running Tesseract OCR...' : 'Process & Download Docx'}
              </button>
          </div>
      </div>
    </div>
  );
}
