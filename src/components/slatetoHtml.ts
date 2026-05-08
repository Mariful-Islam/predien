import { Descendant, Text } from "slate";

export function slateToHtml(nodes: Descendant[]): string {
  return nodes.map((node, index) => serializeNode(node, index)).join("");
}

function serializeNode(node: any, index: number): string {
  if (Text.isText(node)) {
    return serializeLeaf(node);
  }

  if (node.type === "code-block") {
    // 1. Ensure we are grabbing the text from the correct child structure
    // If your code blocks have multiple lines as separate children, this joins them.
    const rawCode = node.children
      .map((n: any) => n.text ?? n.children?.map((c: any) => c.text).join("") ?? "")
      .join("\n");
      
    const escapedCode = escapeHtml(rawCode);
    const lang = node.language || "jsx";
    
    // 2. Avoid Math.random() to prevent Hydration errors. 
    // Use the index or a fixed string if possible.
    const blockId = `code-block-${index}`;

    return `
      <div class="relative max-w-full border rounded-lg overflow-hidden bg-[#0d1117] text-white my-6 group font-sans">
        <div class="flex justify-between items-center px-4 py-2 bg-[#161b22] border-b border-gray-800">
          <span class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">${lang}</span>
          <button 
            onclick="copyToClipboard('${blockId}', this)"
            class="bg-gray-700 text-[11px] px-3 py-1 rounded hover:bg-gray-600 transition-all text-gray-200"
          >
            Copy
          </button>
        </div>
        <pre class="overflow-auto p-4 font-mono text-sm whitespace-pre m-0" style="min-height: 50px; max-height: 600px;">
          <code id="${blockId}" class="language-${lang}">${escapedCode}</code>
        </pre>
      </div>
    `;
  }

  const children = node.children.map((n: any, i: number) => serializeNode(n, i)).join("");

  switch (node.type) {
    case "paragraph":
      return `<p class="mt-2 mb-6 leading-relaxed">${children}</p>`;
    case "heading-one":
      return `<h1 class="text-3xl font-bold mt-8 mb-4">${children}</h1>`;
    case "heading-two":
      return `<h2 id=${node.children[0].text.replace(/\s+/g, "-").toLowerCase()} class="text-2xl scroll-mt-20 scroll-smooth font-semibold mt-6 mb-3">${children}</h2>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "bulleted-list":
      return `<ul class="list-disc ml-8 my-4">${children}</ul>`;
    default:
      return `<div>${children}</div>`;
  }
}

function serializeLeaf(leaf: any): string {
  let text = escapeHtml(leaf.text);
  if (leaf.bold) text = `<strong>${text}</strong>`;
  if (leaf.italic) text = `<em>${text}</em>`;
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