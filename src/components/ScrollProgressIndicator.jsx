import React, { useState, useEffect } from 'react';

/**
 * Scroll Progress Indicator Component
 * Displays a fixed progress bar at the top of the viewport
 * that shows reading progress as the user scrolls
 */
const ScrollProgressIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      
      const percentage = Math.min((scrollTop / scrollHeight) * 100, 100);
      setProgress(percentage);
    };

    // Calculate initial progress
    handleScroll();

    // Add scroll listener with immediate response
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle resize events
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);



  return (
    <div 
      className="fixed top-0 left-0 w-full z-[9999]"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ 
        height: '6px',
        backgroundColor: 'transparent'
      }}
    >
      <div 
        className="h-full"
        style={{ 
          width: `${progress}%`,
          backgroundColor: '#FEBE29',
          opacity: progress > 0 ? 1 : 0,
          transition: 'opacity 0.1s ease-out'
        }}
      />
    </div>
  );
};

export default ScrollProgressIndicator; 