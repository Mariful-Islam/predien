import { Descendant, Text } from "slate";

/**
 * Converts an array of Slate JSON nodes into a clean, scannable string of HTML.
 * @param nodes - Array of Slate Descendant nodes from the rich text editor state.
 * @returns Serialized HTML string with Tailwind styles baked in.
 */
export function slateToHtml(nodes: Descendant[]): string {
  if (!Array.isArray(nodes)) return "";
  return nodes.map((node, index) => serializeNode(node, index)).join("");
}

function serializeNode(node: any, index: number): string {
  // 1. Structural Leaf Processing (Bold, Italic, Inline Code)
  if (Text.isText(node)) {
    return serializeLeaf(node);
  }

  // 2. Custom Block Overrides (Code Blocks with dedicated layout)
 if (node.type === "code-block") {
    const rawCode = node.children
      .map((n: any) => n.text ?? n.children?.map((c: any) => c.text).join("") ?? "")
      .join("\n");
      
    const escapedCode = escapeHtml(rawCode);
    
    // We also need to escape quotes securely so it doesn't break the HTML attribute boundary
    const attributeSafeCode = escapedCode
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    const lang = node.language || "jsx";

    return `
      <div class="relative max-w-full border rounded-lg overflow-hidden bg-[#0d1117] text-white my-6 group font-sans">
        <div class="flex justify-between items-center px-4 py-2 bg-[#161b22] border-b border-gray-800">
          <span class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">${lang}</span>
          <button 
            data-code="${attributeSafeCode}"
            onclick="(() => {
              const code = this.getAttribute('data-code');
              navigator.clipboard.writeText(code).then(() => {
                const orig = this.innerText;
                this.innerText = 'Copied!';
                this.style.backgroundColor = '#16a34a';
                setTimeout(() => {
                  this.innerText = orig;
                  this.style.backgroundColor = '';
                }, 1500);
              });
            })()"
            class="bg-gray-700 text-[11px] px-3 py-1 rounded hover:bg-gray-600 transition-all text-gray-200 cursor-pointer"
          >
            Copy
          </button>
        </div>
        <pre class="overflow-auto p-4 font-mono text-sm whitespace-pre m-0" style="min-height: 50px; max-height: 600px;"><code class="language-${lang}">${escapedCode}</code></pre>
      </div>
    `;
  }

  // Recursive serialization map for standard element children nodes
  const children = node.children ? node.children.map((n: any, i: number) => serializeNode(n, i)).join("") : "";

  // 3. Document Element Switch Parser Engine
  switch (node.type) {
    case "paragraph":
      return `<p class="mt-2 mb-6 leading-relaxed">${children}</p>`;
      
    case "heading-one":
      return `<h1 class="text-3xl font-bold mt-8 mb-4">${children}</h1>`;
      
    case "heading-two": {
      const headText = node.children?.[0]?.text || "";
      const slugId = headText.replace(/\s+/g, "-").toLowerCase();
      return `<h2 id="${slugId}" class="text-2xl scroll-mt-20 scroll-smooth font-semibold mt-6 mb-3">${children}</h2>`;
    }
    
    case "list-item":
      return `<li>${children}</li>`;
      
    case "bulleted-list":
      return `<ul class="list-disc ml-8 my-4">${children}</ul>`;
      
    case "numbered-list":
      return `<ol class="list-decimal ml-8 my-4">${children}</ol>`;
      
    case "image": {
      const imageUrl = escapeHtml(node.url || "");
      const imageAlt = escapeHtml(node.alt || "Editor image");
      return `
        <div class="my-6 max-w-full flex justify-center">
          <img 
            src="${imageUrl}" 
            alt="${imageAlt}" 
            class="block max-w-full max-h-[500px] object-contain rounded-md shadow-sm border border-gray-100" 
          />
        </div>
      `;
    }
    
    default:
      // Graceful fallback to maintain rich-text layouts for custom plugins
      return `<div>${children}</div>`;
  }
}

function serializeLeaf(leaf: any): string {
  let text = escapeHtml(leaf.text);
  
  if (leaf.bold) text = `<strong>${text}</strong>`;
  if (leaf.italic) text = `<em>${text}</em>`;
  if (leaf.underline) text = `<u>${text}</u>`;
  if (leaf.code) {
    text = `<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-pink-500 font-mono text-[0.9em]">${text}</code>`;
  }
  
  return text;
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}