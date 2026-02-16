import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DocumentViewer from './components/DocumentViewer';
import SearchPanel from './components/SearchPanel';
import { api } from './api/client';
import './App.css';

function App() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    loadLanguages();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Escape to close search
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const loadLanguages = async () => {
    try {
      setLoading(true);
      const data = await api.getLanguages();
      setLanguages(data);
      
      // Auto-select first language if available
      if (data.length > 0 && !selectedLanguage) {
        setSelectedLanguage(data[0]);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load languages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Sidebar
          languages={languages}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          onOpenSearch={() => setSearchOpen(true)}
        />
        
        <main className="main-content">
          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading documentation...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={loadLanguages}>Retry</button>
            </div>
          )}
          
          {!loading && !error && (
            <Routes>
              <Route 
                path="/" 
                element={
                  selectedLanguage ? 
                    <Navigate to={`/${selectedLanguage}/basics`} replace /> : 
                    <div className="empty-state">
                      <h2>No documentation available</h2>
                      <p>Add documentation files to get started</p>
                    </div>
                } 
              />
              <Route 
                path="/:language/:type" 
                element={<DocumentViewer />} 
              />
              <Route 
                path="/:language/:type/:docId" 
                element={<DocumentViewer />} 
              />
            </Routes>
          )}
        </main>

        {searchOpen && selectedLanguage && (
          <SearchPanel
            language={selectedLanguage}
            onClose={() => setSearchOpen(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
