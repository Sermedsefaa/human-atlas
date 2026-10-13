import fs from 'node:fs';

const atlas = JSON.parse(fs.readFileSync(new URL('../public/models/atlas.json', import.meta.url)));
const ids = new Set(atlas.concepts.map(c => c.id));
const rows = JSON.parse(fs.readFileSync(new URL('./data/explanations-seed.json', import.meta.url)));
const valid = rows.filter(r => ids.has(r[0]));
const lines = valid.map(r => ` ${r[0]}:'${r[1].replace(/'/g, "\\'")}',`);
console.log(`// ${valid.length} entries`);
console.log(lines.join('\n'));
