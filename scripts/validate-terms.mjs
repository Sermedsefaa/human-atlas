import fs from 'node:fs';
import assert from 'node:assert/strict';

const atlas = JSON.parse(fs.readFileSync(new URL('../public/models/atlas.json', import.meta.url)));
const terms = JSON.parse(fs.readFileSync(new URL('../public/models/terms.tr.json', import.meta.url)));

assert.equal(terms.version, 1);
assert.ok(terms.entries && typeof terms.entries === 'object');

for (const c of atlas.concepts) {
  const e = terms.entries[c.id];
  assert.ok(e, `missing term entry for ${c.id} (${c.name})`);
  assert.ok(e.tr?.trim(), `${c.id}: empty tr`);
  assert.ok(e.la?.trim(), `${c.id}: empty la`);
  assert.ok(e.en?.trim(), `${c.id}: empty en`);
  assert.ok(Array.isArray(e.search) && e.search.length > 0, `${c.id}: search keys`);
  assert.equal(e.en, c.name, `${c.id}: en mismatch`);
}

const ids = Object.keys(terms.entries);
assert.equal(ids.length, atlas.concepts.length, 'extra or missing term keys');

console.log(
  `Validated ${atlas.concepts.length} term records (tr/la/en/search) against atlas concepts.`,
);
