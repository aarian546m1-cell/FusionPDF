import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FileText, FileUp, PenTool, ScanSearch, LayoutDashboard } from 'lucide-react';

// Placeholders for page components
import AIToDocs from './pages/AIToDocs.jsx';
import PDFToWord from './pages/PDFToWord.jsx';
import PDFToolkit from './pages/PDFToolkit.jsx';
import OCREngine from './pages/OCREngine.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'AI to Docs', icon: <FileText size={20} /> },
    { path: '/pdf-to-word', label: 'PDF to Word', icon: <FileUp size={20} /> },
    { path: '/pdf-toolkit', label: 'PDF Toolkit', icon: <PenTool size={20} /> },
    { path: '/ocr', label: 'OCR Engine', icon: <ScanSearch size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-background relative z-10 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-64 bg-paper/80 backdrop-blur-md border-r border-bordercolor flex flex-col transition-colors duration-500 shadow-neoskeuo dark:shadow-none z-20">
        <div className="p-6 flex items-center gap-3 text-main font-bold text-xl border-b border-bordercolor transition-colors duration-500">
          <LayoutDashboard className="text-primary" />
          DocSuite UI
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                location.pathname === item.path
                  ? 'bg-primary text-white shadow-btn dark:shadow-neoskeuo'
                  : 'text-muted hover:bg-black/5 dark:hover:bg-white/10 hover:text-main'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Theme Settings at Bottom */}
        <div className="p-4 border-t border-bordercolor mt-auto">
           <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full p-8 relative z-10">
        <div className="max-w-7xl mx-auto h-full space-y-6">
          <Routes>
            <Route path="/" element={<AIToDocs />} />
            <Route path="/pdf-to-word" element={<PDFToWord />} />
            <Route path="/pdf-toolkit" element={<PDFToolkit />} />
            <Route path="/ocr" element={<OCREngine />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
