import React, { useState, useEffect } from 'react';
import MarkdownRenderer from './components/MarkdownRenderer';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';

export default function App() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        // Use the correct path based on the base URL
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}cv.md`);
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status}`);
        }
        const content = await response.text();
        setMarkdownContent(content);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownContent();
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
      >
        <MarkdownRenderer content={markdownContent} />
      </div>
    </div>
  );
}
