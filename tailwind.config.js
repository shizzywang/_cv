module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{html,js}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Main text colors - easy to customize
        primary: {
          text: '#1a1a1a',        // Main headings and important text
          background: '#ffffff',   // Page background
        },
        // Secondary text colors - for dates, locations, descriptions
        secondary: {
          text: '#374151',        // Job titles, dates, locations (darker for better readability)
          muted: '#6b7280',       // Subtle details, descriptions
        },
        // Accent colors - for links and highlights
        accent: {
          primary: '#2563eb',     // Main accent color (deeper blue)
          hover: '#1d4ed8',       // Hover state for links
          subtle: '#eff6ff',      // Subtle background for highlights
        },
        // Border and divider colors
        border: {
          light: '#d1d5db',       // Light borders and dividers
          medium: '#9ca3af',      // Medium borders
        },
        // Background colors for sections
        section: {
          light: '#f9fafb',       // Very light background for sections
          subtle: '#f3f4f6',      // Subtle background for job entries
        }
      },
      fontFamily: {
        sans: [
          'Geologica',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          'Sorts Mill Goudy',
          'Georgia',
          'serif',
        ],
        mono: [
          'Fira Mono',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      spacing: {
        '18': '4.5rem',           // Custom spacing for sections
        '22': '5.5rem',           // Custom spacing for major sections
        '1000': '1000px',         // Custom large spacing
      }
    },
  },
  plugins: [],
}; 