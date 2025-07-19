import React, { useState, useEffect } from 'react';

const PasswordProtection = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password - you can change this
  const CORRECT_PASSWORD = 'cv2025';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('cv-authenticated', 'true');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const authenticated = localStorage.getItem('cv-authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-12 w-96">
        <form onSubmit={handleSubmit}>
          {/* Title and input container */}
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Instrument Sans, Georgia, serif' }}>
              Ian's CV
            </h1>
            
            <div className="flex items-center gap-3">
              {/* Error icon container - separate from input */}
              <div className="w-5 h-5 flex items-center justify-center">
                {error && (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#dc2626" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="animate-pulse transition-opacity duration-300 ease-in-out"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                )}
              </div>
              
              <input
                type="password"
                value={password}
                onChange={handleInputChange}
                placeholder="password"
                className={`flex-1 py-4 text-xl outline-none rounded-lg transition-all duration-300 ease-in-out border-0 focus:ring-0 ${
                  error 
                    ? 'bg-red-50 focus:bg-red-50' 
                    : 'bg-gray-100 focus:bg-white'
                }`}
                style={{ 
                  fontFamily: 'Geologica, ui-sans-serif, system-ui, sans-serif',
                  padding: '0',
                  boxSizing: 'border-box',
                  textIndent: '0'
                }}
                autoFocus
              />
            </div>
          </div>
          
          {/* View button aligned to the right */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-8 rounded-2xl transition-all duration-200 font-bold text-2xl shadow-sm hover:shadow-md border-0"
              style={{ fontFamily: 'Instrument Sans, Georgia, serif' }}
            >
              View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection; 