import React, { useState, useEffect } from 'react';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';

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
      <div className="bg-primary-background text-primary-text font-sans min-h-screen flex justify-center items-center">
        <div className="text-lg font-thin text-secondary-text">Loading CV...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary-background text-primary-text font-sans min-h-screen flex justify-center items-center">
        <div className="text-lg font-thin text-red-600">Error loading CV: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-primary-background text-primary-text font-sans min-h-screen leading-relaxed">
      <ScrollProgressIndicator />
      <div 
        className="cv-container"
        style={{
          maxWidth: '65rem',
          margin: '0 auto',
          padding: '4rem 2rem',
          width: '100%',
          boxSizing: 'border-box'
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
