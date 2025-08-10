import { Descendant, Text } from "slate";

export function slateToHtml(nodes: Descendant[]): string {
  return nodes.map(serializeNode).join("");
}

function serializeNode(node: any): string {
  if (Text.isText(node)) {
    return serializeLeaf(node);
  }

  const children = node.children.map(serializeNode).join("");

  switch (node.type) {
    case "paragraph":
      return `<p class="mt-2 mb-6">${children}</p>`;
    case "heading-one":
      return `<h1 id=${node.children[0].text
        .replace(/\s+/g, "-")
        .toLowerCase()} class="mt-6 scroll-mt-32">${children}</h1>`;
    case "heading-two":
      return `<h2 id=${node.children[0].text
        .replace(/\s+/g, "-")
        .toLowerCase()} class="mt-6 scroll-mt-32">${children}</h2>`;
    case "block-quote":
      return `<blockquote class="ml-6">${children}</blockquote>`;
    case "bulleted-list":
      return `<ul class="ml-6">${children}</ul>`;
    case "numbered-list":
      return `<ol class="ml-6">${children}</ol>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "code-block":
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>${
        children
      }</code></pre>`;

    default:
      return `<div>${children}</div>`;
  }
}

function serializeLeaf(leaf: any): string {
  let text = escapeHtml(leaf.text);

  if (leaf.bold) {
    text = `<strong>${text}</strong>`;
  }
  if (leaf.italic) {
    text = `<em>${text}</em>`;
  }
  if (leaf.underline) {
    text = `<u>${text}</u>`;
  }
  if (leaf.code) {
    let codeBlockCounter = 0;
    const codeId = `code-block-${++codeBlockCounter}`;
    text = `
      <div class="relative group m-0 p-0 overflow-y-auto">
        <pre class="m-0 p-0" ><code id="${codeId}" class="m-0 p-0">${text}</code></pre>
      </div>
    `;
  }

  return text;
}







// Escapes HTML but preserves whitespace for code blocks
function escapeHtmlPreserveWhitespace(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Escapes HTML fully (use for regular content)
function escapeHtml(str: string): string {
  return escapeHtmlPreserveWhitespace(str)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
