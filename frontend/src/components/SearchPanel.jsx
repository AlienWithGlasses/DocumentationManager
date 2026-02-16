import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import './SearchPanel.css';

function SearchPanel({ language, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, language]);

  useEffect(() => {
    // Scroll selected item into view
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const data = await api.search(language, query);
      setResults(data);
      setSelectedIndex(0);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      selectResult(results[selectedIndex]);
    }
  };

  const selectResult = (result) => {
    navigate(`/${language}/${result.type}/${result.docId}`);
    onClose();
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i}>{part}</mark> : 
        part
    );
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={`Search ${language} documentation...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="search-results" ref={resultsRef}>
          {loading && (
            <div className="search-loading">
              <div className="spinner-small" />
              <span>Searching...</span>
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="search-empty">
              <span className="empty-icon">🔍</span>
              <p>No results found for "{query}"</p>
            </div>
          )}

          {!loading && query.length > 0 && query.length < 2 && (
            <div className="search-hint">
              Type at least 2 characters to search
            </div>
          )}

          {!loading && results.map((result, index) => (
            <button
              key={`${result.type}-${result.docId}-${result.matchType}-${index}`}
              className={`search-result-item ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => selectResult(result)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="result-header">
                <span className="result-icon">
                  {result.type === 'basics' ? '📄' : '📦'}
                </span>
                <span className="result-title">
                  {highlightMatch(result.title, query)}
                </span>
                <span className="result-type-badge">{result.type}</span>
              </div>
              
              {result.matchType === 'function' && result.functionName && (
                <div className="result-function">
                  <code>{highlightMatch(result.functionName, query)}</code>
                  {result.functionSignature && (
                    <span className="function-sig">{result.functionSignature}</span>
                  )}
                </div>
              )}
              
              {result.snippet && (
                <p className="result-snippet">
                  {highlightMatch(result.snippet, query)}
                </p>
              )}
            </button>
          ))}
        </div>

        {results.length > 0 && (
          <div className="search-footer">
            <div className="keyboard-hints">
              <kbd>↑↓</kbd> Navigate
              <kbd>↵</kbd> Select
              <kbd>esc</kbd> Close
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPanel;
