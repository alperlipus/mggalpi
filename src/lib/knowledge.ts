import fs from 'node:fs';
import path from 'node:path';

export interface KnowledgeChunk {
  source: string;
  heading: string;
  text: string;
}

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');

let cache: { chunks: KnowledgeChunk[]; stamp: string } | null = null;

/* Cheap fingerprint so edits to knowledge/ are picked up without a restart. */
function dirStamp(): string {
  try {
    return fs
      .readdirSync(KNOWLEDGE_DIR)
      .filter((f) => f.endsWith('.md') || f.endsWith('.txt'))
      .map((f) => {
        const st = fs.statSync(path.join(KNOWLEDGE_DIR, f));
        return `${f}:${st.mtimeMs}:${st.size}`;
      })
      .join('|');
  } catch {
    return '';
  }
}

function loadChunks(): KnowledgeChunk[] {
  const stamp = dirStamp();
  if (cache && cache.stamp === stamp) return cache.chunks;

  const chunks: KnowledgeChunk[] = [];
  try {
    const files = fs
      .readdirSync(KNOWLEDGE_DIR)
      .filter((f) => f.endsWith('.md') || f.endsWith('.txt'));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(KNOWLEDGE_DIR, file), 'utf8');
      // Split on markdown headings; keep the heading with its body.
      const parts = raw.split(/(?=^#{1,3} )/m);
      for (const part of parts) {
        const trimmed = part.trim();
        if (!trimmed) continue;
        const headingMatch = trimmed.match(/^#{1,3} (.+)$/m);
        const heading = headingMatch ? headingMatch[1].trim() : file;
        // Further split very long sections into ~1200-char pieces on paragraph borders.
        if (trimmed.length <= 1600) {
          chunks.push({ source: file, heading, text: trimmed });
        } else {
          let buf = '';
          for (const para of trimmed.split(/\n\n+/)) {
            if (buf.length + para.length > 1200 && buf) {
              chunks.push({ source: file, heading, text: buf.trim() });
              buf = '';
            }
            buf += para + '\n\n';
          }
          if (buf.trim()) chunks.push({ source: file, heading, text: buf.trim() });
        }
      }
    }
  } catch {
    // knowledge dir missing — return empty, caller handles it
  }

  cache = { chunks, stamp };
  return chunks;
}

function normalize(s: string): string[] {
  return s
    .toLocaleLowerCase('tr')
    .replace(/[^a-z0-9çğıöşüâîûωαβη؀-ۿ\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

/* Lightweight lexical retrieval: term overlap + phrase and heading bonuses. */
export function retrieve(query: string, topK = 6): KnowledgeChunk[] {
  const chunks = loadChunks();
  if (chunks.length === 0) return [];

  const qTokens = normalize(query);
  if (qTokens.length === 0) return chunks.slice(0, topK);

  const scored = chunks.map((chunk) => {
    const hay = chunk.text.toLocaleLowerCase('tr');
    const headingHay = chunk.heading.toLocaleLowerCase('tr');
    let score = 0;
    for (const tok of qTokens) {
      if (hay.includes(tok)) score += 1;
      if (headingHay.includes(tok)) score += 2;
      // partial stem match for Turkish suffixes (first 5 chars)
      const stem = tok.slice(0, 5);
      if (stem.length >= 4 && hay.includes(stem)) score += 0.4;
    }
    if (hay.includes(query.toLocaleLowerCase('tr'))) score += 4;
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}

export function knowledgeAvailable(): boolean {
  return loadChunks().length > 0;
}
