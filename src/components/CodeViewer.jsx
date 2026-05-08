import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
// Import languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme

const CodeViewer = ({ item }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  
  // Extract full text from Slate children
  const codeText = item.children?.map(child => child.text).join('\n') || '';
  const language = item.language || 'javascript';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  // Run Prism highlighting after render
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [codeText, language]);

  return (
    <div className="relative max-w-full border rounded-lg overflow-hidden bg-gray-900 text-white my-4">
      {/* Header / Copy Button */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-mono text-gray-400 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="bg-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-600 transition-colors flex items-center gap-1"
        >
          {copied ? (
            <span className="text-green-400">✓ Copied!</span>
          ) : (
            <span>Copy</span>
          )}
        </button>
      </div>

      <pre className="resize-y overflow-auto p-4 font-mono text-sm whitespace-pre" style={{ minHeight: "100px", maxHeight: "500px" }}>
        <code 
          ref={codeRef} 
          className={`language-${language}`}
        >
          {codeText}
        </code>
      </pre>
    </div>
  );
};


export default CodeViewer;