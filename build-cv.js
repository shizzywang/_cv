import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';

// Read the markdown file
const markdown = readFileSync('public/cv.md', 'utf8');

// Configure marked to add CSS classes
marked.setOptions({
  gfm: true,
  breaks: true
});

// Convert to HTML
let html = marked(markdown);

// Add CSS classes to match the original ReactMarkdown styling
html = html
  // Main heading - name at the top
  .replace(/<h1>/g, '<h1 class="font-serif text-4xl md:text-5xl lg:text-6xl mb-12 leading-tight tracking-tight text-primary-text pb-6">')
  
  // Section headings - Work Experience, Education, etc.
  .replace(/<h2>/g, '<h2 class="font-serif text-2xl md:text-3xl mb-10 mt-20 leading-snug tracking-tight text-primary-text pb-4 text-right">')
  
  // Company names and Education institutions
  .replace(/<h3>/g, '<h3 class="font-serif text-primary-text mb-1">')
  
  // Minor subsections
  .replace(/<h4>/g, '<h4 class="font-sans text-lg font-semibold mb-3 mt-8 leading-snug text-primary-text">')
  .replace(/<h5>/g, '<h5 class="font-sans text-base font-medium mb-2 leading-snug text-primary-text">')
  .replace(/<h6>/g, '<h6 class="font-sans text-sm font-medium mb-2 leading-snug text-primary-text">')
  
  // Paragraphs - main content
  .replace(/<p>/g, '<p class="font-sans font-thin leading-relaxed text-secondary-text mb-3">')
  
  // Links with enhanced styling
  .replace(/<a href=/g, '<a target="_blank" rel="noopener noreferrer" class="text-accent-primary underline hover:text-accent-hover transition-colors duration-200 font-medium" href=')
  
  // Lists with better spacing and styling
  .replace(/<ul>/g, '<ul class="list-disc mb-16 space-y-3 font-sans font-thin text-secondary-text ml-1">')
  .replace(/<ol>/g, '<ol class="list-decimal mb-16 space-y-3 font-sans font-thin text-secondary-text ml-1">')
  .replace(/<li>/g, '<li class="font-sans font-thin text-secondary-text leading-relaxed">')
  
  // Code blocks with subtle styling
  .replace(/<code>/g, '<code class="font-mono bg-accent-subtle px-2 py-1 rounded text-sm text-primary-text border border-border-light">')
  
  // Blockquotes with subtle styling
  .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-accent-primary pl-6 italic mb-6 font-sans font-thin text-secondary-text bg-accent-subtle py-4 rounded-r-lg">')
  
  // Tables with professional styling
  .replace(/<table>/g, '<table class="w-full border-collapse border border-border-light mb-6 rounded-lg overflow-hidden">')
  .replace(/<thead>/g, '<thead class="bg-section-light">')
  .replace(/<tbody>/g, '<tbody>')
  .replace(/<tr>/g, '<tr class="border-b border-border-light hover:bg-section-subtle transition-colors duration-150">')
  .replace(/<th>/g, '<th class="border border-border-light px-4 py-3 text-left font-sans font-semibold text-primary-text">')
  .replace(/<td>/g, '<td class="border border-border-light px-4 py-3 font-sans font-thin text-secondary-text">')
  
  // Strong text - job titles, important info
  .replace(/<strong>/g, '<strong class="font-sans font-semibold text-primary-text">')
  
  // Emphasis - dates, subtle emphasis
  .replace(/<em>/g, '<em class="font-sans font-thin italic text-secondary-muted">');

// Write the HTML file
writeFileSync('public/cv.html', html);

console.log('✅ CV converted from markdown to HTML with styling'); 