import fs from 'node:fs';

const seed = JSON.parse(fs.readFileSync(new URL('./data/explanations-seed.json', import.meta.url)));
const anatomyPath = new URL('../app/anatomy.ts', import.meta.url);
let txt = fs.readFileSync(anatomyPath, 'utf8');
const re = / (FMA\d+):'((?:\\'|[^'])*)',/g;
const existing = new Map();
for (const m of txt.matchAll(re)) existing.set(m[1], m[2].replace(/\\'/g, "'"));
let added = 0;
for (const [id, text] of seed) {
  if (!existing.has(id)) {
    existing.set(id, text);
    added++;
  }
}
const sorted = [...existing.entries()].sort((a, b) => a[0].localeCompare(b[0], undefined, {numeric: true}));
const body = sorted.map(([id, t]) => ` ${id}:'${t.replace(/'/g, "\\'")}',`).join('\n');
const start = txt.indexOf('export const EXPLANATIONS');
const open = txt.indexOf('{', start);
const close = txt.indexOf('\n};', open);
txt = `${txt.slice(0, open + 1)}\n${body}\n${txt.slice(close)}`;
fs.writeFileSync(anatomyPath, txt);
console.log(`EXPLANATIONS: ${sorted.length} entries (${added} added from seed).`);
