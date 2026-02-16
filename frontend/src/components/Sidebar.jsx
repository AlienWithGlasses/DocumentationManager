import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';
import './Sidebar.css';

function Sidebar({ languages, selectedLanguage, onSelectLanguage, onOpenSearch }) {
  const navigate = useNavigate();
  const { language: urlLanguage, type: urlType, docId } = useParams();
  const [activeTab, setActiveTab] = useState('basics');
  const [basicsPages, setBasicsPages] = useState([]);
  const [packagesPages, setPackagesPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlType) {
      setActiveTab(urlType);
    }
  }, [urlType]);

  useEffect(() => {
    if (selectedLanguage) {
      loadDocuments();
    }
  }, [selectedLanguage]);

  const loadDocuments = async () => {
    if (!selectedLanguage) return;
    
    setLoading(true);
    try {
      const [basics, packages] = await Promise.all([
        api.getDocuments(selectedLanguage, 'basics'),
        api.getDocuments(selectedLanguage, 'packages'),
      ]);
      
      setBasicsPages(basics);
      setPackagesPages(packages);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    onSelectLanguage(lang);
    navigate(`/${lang}/${activeTab}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/${selectedLanguage}/${tab}`);
  };

  const handleDocumentClick = (doc) => {
    navigate(`/${selectedLanguage}/${activeTab}/${doc.id}`);
  };

  const currentPages = activeTab === 'basics' ? basicsPages : packagesPages;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          <span className="title-icon">📚</span>
          Docs
        </h1>
        
        <button className="search-trigger" onClick={onOpenSearch}>
          <span className="search-icon">🔍</span>
          <span className="search-text">Search</span>
          <kbd className="search-kbd">⌘K</kbd>
        </button>
      </div>

      <div className="language-selector">
        <label className="selector-label">Language</label>
        <select 
          value={selectedLanguage || ''} 
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="language-select"
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {selectedLanguage && (
        <>
          <div className="doc-tabs">
            <button
              className={`tab-button ${activeTab === 'basics' ? 'active' : ''}`}
              onClick={() => handleTabChange('basics')}
            >
              Basics
              {basicsPages.length > 0 && (
                <span className="tab-count">{basicsPages.length}</span>
              )}
            </button>
            <button
              className={`tab-button ${activeTab === 'packages' ? 'active' : ''}`}
              onClick={() => handleTabChange('packages')}
            >
              Packages
              {packagesPages.length > 0 && (
                <span className="tab-count">{packagesPages.length}</span>
              )}
            </button>
          </div>

          <nav className="doc-list">
            {loading ? (
              <div className="list-loading">
                <div className="spinner-small" />
              </div>
            ) : currentPages.length === 0 ? (
              <div className="list-empty">
                No {activeTab} documentation available
              </div>
            ) : (
              currentPages.map(doc => (
                <button
                  key={doc.id}
                  className={`doc-item ${docId === doc.id ? 'active' : ''}`}
                  onClick={() => handleDocumentClick(doc)}
                >
                  <span className="doc-icon">
                    {activeTab === 'basics' ? '📄' : '📦'}
                  </span>
                  <span className="doc-title">{doc.title}</span>
                  {doc.functionCount && (
                    <span className="function-badge">{doc.functionCount}</span>
                  )}
                </button>
              ))
            )}
          </nav>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
