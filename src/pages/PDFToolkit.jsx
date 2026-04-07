import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PenTool, Highlighter, FileSignature, Spline } from 'lucide-react';

export default function PDFToolkit() {
  const [activeTab, setActiveTab] = useState('sign');
  const sigCanvas = useRef({});

  const clearSignature = () => {
      sigCanvas.current.clear();
  };

  const saveSignature = () => {
      if (sigCanvas.current.isEmpty()) {
          alert("Please provide a signature first.");
          return;
      }
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      // In a real app, send dataURL to backend to stamp onto PDF
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'signature.png';
      link.click();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <PenTool className="text-primary" /> PDF Toolkit
        </h1>
        <p className="text-gray-600 font-medium text-lg">
            Advanced manipulation tools: Sign, Merge, Split, and Annotate.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl border border-gray-100 min-h-[600px] flex overflow-hidden">
          {/* Tabs Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-2">
              <button 
                onClick={() => setActiveTab('sign')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-semibold transition ${activeTab === 'sign' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                  <FileSignature size={20} /> Sign & Date
              </button>
              <button 
                onClick={() => setActiveTab('annotate')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-semibold transition ${activeTab === 'annotate' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                  <Highlighter size={20} /> Annotate
              </button>
              <button 
                onClick={() => setActiveTab('merge-split')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-semibold transition ${activeTab === 'merge-split' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                  <Spline size={20} /> Merge & Split
              </button>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 p-8 bg-gray-50/50">
              {activeTab === 'sign' && (
                  <div className="h-full flex flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Draw Your Signature</h2>
                      <div className="bg-white border-2 border-gray-300 rounded-xl shadow-inner w-full max-w-2xl h-80 overflow-hidden relative">
                         <SignatureCanvas 
                            ref={sigCanvas} 
                            canvasProps={{className: 'w-full h-full cursor-crosshair'}}
                         />
                         <div className="absolute top-2 left-2 text-gray-400 pointer-events-none select-none">Sign Here</div>
                         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 border-b-2 border-dashed border-gray-300 w-3/4"></div>
                      </div>
                      <div className="mt-8 flex gap-4">
                          <button onClick={clearSignature} className="px-6 py-3 rounded-lg font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition">
                              Clear Pad
                          </button>
                          <button onClick={saveSignature} className="px-6 py-3 rounded-lg font-bold text-white bg-primary hover:bg-accent shadow-lg transition">
                              Save Signature
                          </button>
                      </div>
                  </div>
              )}

              {activeTab === 'annotate' && (
                  <div className="h-full flex items-center justify-center flex-col text-center">
                      <Highlighter className="text-gray-300 w-24 h-24 mb-4" />
                      <h2 className="text-2xl font-bold text-gray-700">Annotator Canvas</h2>
                      <p className="text-gray-500 mt-2 max-w-md">In a full deployment, this area integrates a PDF.js canvas overlay allowing users to freehand draw bounds and save coordinates for PyMuPDF processing.</p>
                  </div>
              )}

              {activeTab === 'merge-split' && (
                  <div className="h-full flex items-center justify-center flex-col text-center">
                      <Spline className="text-gray-300 w-24 h-24 mb-4" />
                      <h2 className="text-2xl font-bold text-gray-700">Merge & Split Panel</h2>
                      <p className="text-gray-500 mt-2 max-w-md">Upload multiple PDFs to staple them together, or specify start/end page indexes to slice a section out.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
}
