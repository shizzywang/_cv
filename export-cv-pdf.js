import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const markdown = readFileSync(resolve(root, 'public/cv.md'), 'utf8');
marked.setOptions({ gfm: true, breaks: true });
const body = marked(markdown);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ian Ranasinghe — CV</title>
  <style>
    @page { margin: 16mm 14mm; size: A4; }
    * { box-sizing: border-box; }
    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1a1a1a;
      max-width: 720px;
      margin: 0 auto;
      padding: 0;
    }
    h1 {
      font-size: 22pt;
      font-weight: 700;
      margin: 0 0 8pt;
      letter-spacing: -0.02em;
      color: #111;
    }
    h2 {
      font-size: 12pt;
      font-weight: 700;
      margin: 18pt 0 8pt;
      padding-bottom: 3pt;
      border-bottom: 1px solid #ccc;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #222;
    }
    h3 {
      font-size: 11pt;
      font-weight: 700;
      margin: 12pt 0 2pt;
      color: #111;
    }
    h4 {
      font-size: 10.5pt;
      font-weight: 600;
      margin: 8pt 0 2pt;
    }
    p { margin: 0 0 6pt; }
    ul { margin: 0 0 8pt; padding-left: 16pt; }
    li { margin: 0 0 3pt; }
    ul ul { margin: 3pt 0 4pt; }
    strong { font-weight: 600; }
    em { font-style: italic; color: #444; }
    a { color: #1a4a7a; text-decoration: none; }
    br { line-height: 1.2; }
  </style>
</head>
<body>
${body}
</body>
</html>
`;

const outDir = resolve(root, 'public');
const htmlPath = resolve(outDir, 'cv-print.html');
const pdfPath = resolve(outDir, 'Ian-Ranasinghe-CV.pdf');
const artifactsDir = '/opt/cursor/artifacts';

writeFileSync(htmlPath, html);

const chrome =
  process.env.CHROME_PATH ||
  ['google-chrome', 'chromium', 'chromium-browser'].find((bin) => {
    const r = spawnSync('which', [bin], { encoding: 'utf8' });
    return r.status === 0;
  });

if (!chrome) {
  console.error('No Chrome/Chromium found to print PDF');
  process.exit(1);
}

const result = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ],
  { encoding: 'utf8' }
);

if (result.status !== 0) {
  console.error(result.stderr || result.stdout || 'Chrome print failed');
  process.exit(result.status || 1);
}

try {
  mkdirSync(artifactsDir, { recursive: true });
  writeFileSync(
    resolve(artifactsDir, 'Ian-Ranasinghe-CV.pdf'),
    readFileSync(pdfPath)
  );
} catch (err) {
  console.warn('Could not copy PDF to artifacts:', err.message);
}

console.log(`✅ PDF written to ${pdfPath}`);
