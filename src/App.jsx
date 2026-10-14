import React, { useState, useEffect } from 'react';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';

function CrestHomeLink() {
  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <a
      href="https://shizzywang.io/"
      aria-label="Back to shizzywang.io"
      className="cv-crest-link"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.75rem 1rem 0',
        opacity: 0.92,
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'scale(1.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.92';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <img
        src={`${baseUrl}crest.svg`}
        alt=""
        width={52}
        height={52}
        style={{ display: 'block', width: '52px', height: 'auto' }}
      />
    </a>
  );
}

export default function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHtmlContent = async () => {
      try {
        // Use the correct path based on the base URL
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}cv.html`);
        if (!response.ok) {
          throw new Error(`Failed to load CV: ${response.status}`);
        }
        const content = await response.text();
        setHtmlContent(content);
      } catch (err) {
        console.error('Error loading CV:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHtmlContent();
    }, []);



  if (loading) {
    return (
      <div className="bg-primary-background text-primary-text font-sans min-h-screen flex flex-col">
        <CrestHomeLink />
        <div className="flex flex-1 justify-center items-center">
          <div className="text-lg font-thin text-secondary-text">Loading CV...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary-background text-primary-text font-sans min-h-screen flex flex-col">
        <CrestHomeLink />
        <div className="flex flex-1 justify-center items-center">
          <div className="text-lg font-thin text-red-600">Error loading CV: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-background text-primary-text font-sans min-h-screen leading-relaxed">
      <ScrollProgressIndicator />
      <CrestHomeLink />
      <div 
        className="cv-container"
        style={{
          maxWidth: '65rem',
          margin: '0 auto',
          padding: '2.5rem 2rem 4rem',
          width: '100%',
          boxSizing: 'border-box'
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
