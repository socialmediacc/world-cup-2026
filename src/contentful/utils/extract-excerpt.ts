import type { Document, Node } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

const DEFAULT_MAX_LENGTH = 120;

function collectText(node: Node, parts: string[]): void {
  if ("value" in node && typeof node.value === "string") {
    parts.push(node.value);
    return;
  }

  if ("content" in node && Array.isArray(node.content)) {
    for (const child of node.content) {
      collectText(child, parts);
    }
  }
}

function truncate(text: string, maxLength: number): string {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const truncated = normalized.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.6) {
    return `${truncated.slice(0, lastSpace).trim()}…`;
  }

  return `${truncated.trim()}…`;
}

export function extractExcerpt(
  document: unknown,
  maxLength = DEFAULT_MAX_LENGTH,
): string {
  if (!document || typeof document !== "object") {
    return "";
  }

  const doc = document as Document;
  const parts: string[] = [];

  for (const node of doc.content ?? []) {
    if (node.nodeType === BLOCKS.PARAGRAPH || node.nodeType === BLOCKS.HEADING_1) {
      collectText(node, parts);

      const text = parts.join(" ").replace(/\s+/g, " ").trim();

      if (text) {
        return truncate(text, maxLength);
      }

      parts.length = 0;
    }
  }

  for (const node of doc.content ?? []) {
    collectText(node, parts);
  }

  return truncate(parts.join(" "), maxLength);
}
