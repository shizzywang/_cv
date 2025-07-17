import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ content }) => {
  const [currentSection, setCurrentSection] = useState('');

  // Track the current section as we render
  const updateSection = (text) => {
    const cleanText = text.toString().replace(/[^\w\s]/g, '').trim().toLowerCase();
    if (cleanText.includes('education')) {
      setCurrentSection('education');
    } else if (cleanText.includes('work experience')) {
      setCurrentSection('work');
    } else if (cleanText.includes('portfolio')) {
      setCurrentSection('portfolio');
    }
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Main heading - name at the top
        h1: ({ children }) => (
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-12 leading-tight tracking-tight text-primary-text pb-6">
            {children}
          </h1>
        ),
        
        // Section headings - Work Experience, Education, etc.
        h2: ({ children }) => {
          // Remove emojis from section headers
          const cleanText = children.toString().replace(/[^\w\s]/g, '').trim();
          const isPortfolio = cleanText.toLowerCase().includes('portfolio');
          const isEducation = cleanText.toLowerCase().includes('education');
          
          // Update current section
          updateSection(cleanText);
          
          return (
            <h2 className={`font-serif text-2xl md:text-3xl mb-10 mt-20 leading-snug tracking-tight text-primary-text pb-4 ${isPortfolio ? 'portfolio-section text-left' : 'text-right'} ${isEducation ? 'education-section' : ''}`}>
              {cleanText}
            </h2>
          );
        },
        
        // Company names and Education institutions - different styling
        h3: ({ children }) => {
          if (currentSection === 'education') {
            // For education institutions, wrap in a div with consistent spacing
            return (
              <div className="education-institution-block mb-6">
                <h3 className="font-serif text-primary-text mb-2">
                  {children}
                </h3>
              </div>
            );
          } else {
            // For company names in work experience, use different spacing
            return (
              <div className="company-block mb-4">
                <h3 className="font-serif text-primary-text mb-1">
                  {children}
                </h3>
              </div>
            );
          }
        },
        
        // Minor subsections
        h4: ({ children }) => (
          <h4 className="font-sans text-lg font-semibold mb-3 mt-8 leading-snug text-primary-text">
            {children}
          </h4>
        ),
        
        h5: ({ children }) => (
          <h5 className="font-sans text-base font-medium mb-2 leading-snug text-primary-text">
            {children}
          </h5>
        ),
        
        h6: ({ children }) => (
          <h6 className="font-sans text-sm font-medium mb-2 leading-snug text-primary-text">
            {children}
          </h6>
        ),
        
        // Paragraphs - main content with better spacing
        p: ({ children }) => {
          if (currentSection === 'education') {
            // For education paragraphs, reduce bottom margin since the institution block handles spacing
            return (
              <p className="font-sans font-thin leading-relaxed text-secondary-text mb-2">
                {children}
              </p>
            );
          } else {
            // For work experience paragraphs (job titles and dates), use tighter spacing
            return (
              <p className="font-sans font-thin leading-relaxed text-secondary-text mb-3">
                {children}
              </p>
            );
          }
        },
        
        // Horizontal rules - removed for cleaner look
        hr: () => (
          <div className="my-12"></div>
        ),
        
        // Links with enhanced styling
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary underline hover:text-accent-hover transition-colors duration-200 font-medium"
          >
            {children}
          </a>
        ),
        
        // Lists with better spacing and styling
        ul: ({ children }) => (
          <ul className="list-disc mb-16 space-y-3 font-sans font-thin text-secondary-text ml-1">
            {children}
          </ul>
        ),
        
        ol: ({ children }) => (
          <ol className="list-decimal mb-16 space-y-3 font-sans font-thin text-secondary-text ml-1">
            {children}
          </ol>
        ),
        
        li: ({ children }) => (
          <li className="font-sans font-thin text-secondary-text leading-relaxed">
            {children}
          </li>
        ),
        
        // Code blocks with subtle styling
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="font-mono bg-accent-subtle px-2 py-1 rounded text-sm text-primary-text border border-border-light">
                {children}
              </code>
            );
          }
          return (
            <code className={`font-mono block bg-accent-subtle p-4 rounded-lg text-sm text-primary-text overflow-x-auto border border-border-light ${className}`}>
              {children}
            </code>
          );
        },
        
        pre: ({ children }) => (
          <pre className="mb-6 overflow-x-auto">
            {children}
          </pre>
        ),
        
        // Blockquotes with subtle styling
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent-primary pl-6 italic mb-6 font-sans font-thin text-secondary-text bg-accent-subtle py-4 rounded-r-lg">
            {children}
          </blockquote>
        ),
        
        // Tables with professional styling
        table: ({ children }) => (
          <table className="w-full border-collapse border border-border-light mb-6 rounded-lg overflow-hidden">
            {children}
          </table>
        ),
        
        thead: ({ children }) => (
          <thead className="bg-section-light">
            {children}
          </thead>
        ),
        
        tbody: ({ children }) => (
          <tbody>
            {children}
          </tbody>
        ),
        
        tr: ({ children }) => (
          <tr className="border-b border-border-light hover:bg-section-subtle transition-colors duration-150">
            {children}
          </tr>
        ),
        
        th: ({ children }) => (
          <th className="border border-border-light px-4 py-3 text-left font-sans font-semibold text-primary-text">
            {children}
          </th>
        ),
        
        td: ({ children }) => (
          <td className="border border-border-light px-4 py-3 font-sans font-thin text-secondary-text">
            {children}
          </td>
        ),
        
        // Strong text - job titles, important info
        strong: ({ children }) => (
          <strong className="font-sans font-semibold text-primary-text">
            {children}
          </strong>
        ),
        
        // Emphasis - dates, subtle emphasis
        em: ({ children }) => (
          <em className="font-sans font-thin italic text-secondary-muted">
            {children}
          </em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 