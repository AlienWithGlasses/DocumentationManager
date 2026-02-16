import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { api } from '../api/client';
import './DocumentViewer.css';

function DocumentViewer() {
  const { language, type, docId } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (docId) {
      loadDocument();
    } else {
      setDocument(null);
    }
  }, [language, type, docId]);

  const loadDocument = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getDocument(language, type, docId);
      setDocument(data);
    } catch (err) {
      setError('Failed to load document');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!docId) {
    return (
      <div className="viewer-empty">
        <div className="empty-content">
          <span className="empty-icon">👈</span>
          <h2>Select a document</h2>
          <p>Choose a topic from the sidebar to view its documentation</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="viewer-loading">
        <div className="spinner" />
        <p>Loading document...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="viewer-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadDocument}>Retry</button>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <article className="document-viewer">
      <header className="document-header">
        <div className="breadcrumb">
          <span className="breadcrumb-item">{language}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item">{type}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">{document.title}</span>
        </div>
        <h1 className="document-title">{document.title}</h1>
        {document.description && (
          <p className="document-description">{document.description}</p>
        )}
      </header>

      <div className="document-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a({ node, children, href, ...props }) {
              return (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            table({ node, children, ...props }) {
              return (
                <div className="table-wrapper">
                  <table {...props}>{children}</table>
                </div>
              );
            }
          }}
        >
          {document.content}
        </ReactMarkdown>
      </div>

      {document.metadata && (
        <footer className="document-footer">
          {document.metadata.lastModified && (
            <span className="metadata-item">
              Last updated: {new Date(document.metadata.lastModified).toLocaleDateString()}
            </span>
          )}
          {document.metadata.author && (
            <span className="metadata-item">
              Author: {document.metadata.author}
            </span>
          )}
        </footer>
      )}
    </article>
  );
}

export default DocumentViewer;
