/**
 * Export paper to Word and PDF formats
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Export paper to Word format (.docx)
 * Uses markdown-to-docx conversion
 */
export async function exportToWord(markdownPath: string, slug: string): Promise<string> {
  const markdown = readFileSync(markdownPath, 'utf-8');
  
  // Convert markdown to Word-compatible format
  const wordContent = convertMarkdownToWord(markdown);
  
  // Save as .docx (simplified - would use proper library like docx or pandoc)
  const outputPath = join('exports', `${slug}.docx`);
  writeFileSync(outputPath, wordContent);
  
  return outputPath;
}

/**
 * Export paper to PDF format
 * Uses markdown-to-pdf conversion
 */
export async function exportToPDF(markdownPath: string, slug: string): Promise<string> {
  const markdown = readFileSync(markdownPath, 'utf-8');
  
  // Convert markdown to PDF (simplified - would use proper library like puppeteer or pandoc)
  const pdfContent = convertMarkdownToPDF(markdown);
  
  // Save as .pdf
  const outputPath = join('exports', `${slug}.pdf`);
  writeFileSync(outputPath, pdfContent);
  
  return outputPath;
}

/**
 * Convert markdown to Word format
 * This is a simplified version - production would use libraries like:
 * - docx: https://www.npmjs.com/package/docx
 * - pandoc: https://pandoc.org/
 * - markdown-to-docx: https://www.npmjs.com/package/markdown-to-docx
 */
function convertMarkdownToWord(markdown: string): string {
  // Parse markdown structure
  const sections = parseMarkdownSections(markdown);
  
  // Build Word XML structure (simplified)
  let wordXML = `<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>`;
  
  for (const section of sections) {
    if (section.type === 'heading') {
      wordXML += `
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading${section.level}"/>
      </w:pPr>
      <w:r>
        <w:t>${escapeXML(section.content)}</w:t>
      </w:r>
    </w:p>`;
    } else if (section.type === 'paragraph') {
      wordXML += `
    <w:p>
      <w:r>
        <w:t>${escapeXML(section.content)}</w:t>
      </w:r>
    </w:p>`;
    } else if (section.type === 'code') {
      wordXML += `
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Code"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Courier New"/>
        </w:rPr>
        <w:t xml:space="preserve">${escapeXML(section.content)}</w:t>
      </w:r>
    </w:p>`;
    }
  }
  
  wordXML += `
  </w:body>
</w:document>`;
  
  return wordXML;
}

/**
 * Convert markdown to PDF format
 * This is a simplified version - production would use libraries like:
 * - puppeteer: https://pptr.dev/
 * - markdown-pdf: https://www.npmjs.com/package/markdown-pdf
 * - pandoc: https://pandoc.org/
 */
function convertMarkdownToPDF(markdown: string): string {
  // Convert markdown to HTML first
  const html = convertMarkdownToHTML(markdown);
  
  // Apply academic paper styling
  const styledHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 2.5cm;
    }
    body {
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.5;
      text-align: justify;
    }
    h1 {
      font-size: 18pt;
      font-weight: bold;
      text-align: center;
      margin-top: 0;
      margin-bottom: 1em;
    }
    h2 {
      font-size: 14pt;
      font-weight: bold;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    h3 {
      font-size: 12pt;
      font-weight: bold;
      margin-top: 1em;
      margin-bottom: 0.5em;
    }
    p {
      margin-bottom: 0.5em;
      text-indent: 1em;
    }
    code {
      font-family: 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 0.2em 0.4em;
    }
    pre {
      font-family: 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 1em;
      overflow-x: auto;
    }
    .citation {
      font-size: 10pt;
      vertical-align: super;
    }
    .references {
      font-size: 10pt;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
  
  // In production, would use puppeteer to render HTML to PDF
  // For now, return HTML as placeholder
  return styledHTML;
}

/**
 * Convert markdown to HTML
 */
function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;
  
  // Convert headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // Convert bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Convert inline code
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>');
  
  // Convert citations [1]
  html = html.replace(/\[(\d+)\]/g, '<span class="citation">[$1]</span>');
  
  // Convert paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  return html;
}

/**
 * Parse markdown into sections
 */
interface MarkdownSection {
  type: 'heading' | 'paragraph' | 'code' | 'list';
  level?: number;
  content: string;
}

function parseMarkdownSections(markdown: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const lines = markdown.split('\n');
  
  let currentSection: MarkdownSection | null = null;
  let inCodeBlock = false;
  let codeContent: string[] = [];
  
  for (const line of lines) {
    // Code block
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        sections.push({
          type: 'code',
          content: codeContent.join('\n')
        });
        codeContent = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }
    
    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      sections.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2]
      });
      continue;
    }
    
    // Empty line
    if (line.trim() === '') {
      currentSection = null;
      continue;
    }
    
    // Paragraph
    if (!currentSection || currentSection.type !== 'paragraph') {
      currentSection = {
        type: 'paragraph',
        content: line
      };
      sections.push(currentSection);
    } else {
      currentSection.content += ' ' + line;
    }
  }
  
  return sections;
}

/**
 * Escape XML special characters
 */
function escapeXML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Production-ready export using external tools
 * 
 * For production, you would want to use:
 * 
 * 1. For Word export:
 *    - npm install docx
 *    - Or use pandoc: pandoc input.md -o output.docx
 * 
 * 2. For PDF export:
 *    - npm install puppeteer
 *    - Or use pandoc: pandoc input.md -o output.pdf --pdf-engine=xelatex
 * 
 * Example with pandoc:
 * 
 * import { exec } from 'child_process';
 * import { promisify } from 'util';
 * 
 * const execAsync = promisify(exec);
 * 
 * export async function exportToWordPandoc(markdownPath: string, slug: string): Promise<string> {
 *   const outputPath = join('exports', `${slug}.docx`);
 *   await execAsync(`pandoc "${markdownPath}" -o "${outputPath}" --reference-doc=template.docx`);
 *   return outputPath;
 * }
 * 
 * export async function exportToPDFPandoc(markdownPath: string, slug: string): Promise<string> {
 *   const outputPath = join('exports', `${slug}.pdf`);
 *   await execAsync(`pandoc "${markdownPath}" -o "${outputPath}" --pdf-engine=xelatex --template=template.tex`);
 *   return outputPath;
 * }
 */
