// Splits atlas concepts into translation batches (for parallel review or agent work).
// Usage: node scripts/group-concepts.mjs
import fs from 'node:fs';

const atlas = JSON.parse(fs.readFileSync(new URL('../public/models/atlas.json', import.meta.url)));
const batchSize = 300;
const groups = [];
for (let i = 0; i < atlas.concepts.length; i += batchSize) {
  const slice = atlas.concepts.slice(i, i + batchSize);
  groups.push({
    index: groups.length,
    from: i,
    count: slice.length,
    concepts: slice.map(c => ({id: c.id, en: c.name})),
  });
}
const dir = new URL('./data/concept-groups/', import.meta.url);
fs.mkdirSync(dir, {recursive: true});
for (const g of groups) {
  fs.writeFileSync(new URL(`group-${String(g.index).padStart(2, '0')}.json`, dir), JSON.stringify(g, null, 1));
}
console.log(`Wrote ${groups.length} groups (${atlas.concepts.length} concepts, ~${batchSize} each) to scripts/data/concept-groups/`);
