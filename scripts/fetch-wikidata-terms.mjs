// Fetches Latin (la) and Turkish (tr) labels from Wikidata for every FMA id in the atlas.
// Output is a reference file used while preparing public/models/terms.tr.json.
// Usage: node scripts/fetch-wikidata-terms.mjs
import fs from 'node:fs';

const atlas = JSON.parse(fs.readFileSync(new URL('../public/models/atlas.json', import.meta.url)));
const ids = atlas.concepts.map(c => c.id.replace(/^FMA/, ''));
const out = {};
const endpoint = 'https://query.wikidata.org/sparql';
const batchSize = 300;

for (let i = 0; i < ids.length; i += batchSize) {
  const values = ids.slice(i, i + batchSize).map(id => `"${id}"`).join(' ');
  const query = `SELECT ?fma ?la ?tr ?trAlt WHERE {
    VALUES ?fma { ${values} }
    ?item wdt:P1402 ?fma .
    OPTIONAL { ?item rdfs:label ?la FILTER(lang(?la) = "la") }
    OPTIONAL { ?item rdfs:label ?tr FILTER(lang(?tr) = "tr") }
    OPTIONAL { ?item skos:altLabel ?trAlt FILTER(lang(?trAlt) = "tr") }
  }`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
      'User-Agent': 'human-atlas-term-builder/1.0 (educational anatomy viewer)',
    },
    body: new URLSearchParams({query}),
  });
  if (!res.ok) throw new Error(`Wikidata ${res.status}: ${await res.text()}`);
  const json = await res.json();
  for (const b of json.results.bindings) {
    const key = `FMA${b.fma.value}`;
    const entry = (out[key] ??= {});
    if (b.la) entry.la = b.la.value;
    if (b.tr) entry.tr = b.tr.value;
    if (b.trAlt) (entry.trAlt ??= new Set()).add(b.trAlt.value);
  }
  process.stdout.write(`\r${Math.min(i + batchSize, ids.length)}/${ids.length}`);
  await new Promise(r => setTimeout(r, 1000));
}

for (const e of Object.values(out)) if (e.trAlt) e.trAlt = [...e.trAlt];
const dest = new URL('./data/wikidata-terms.json', import.meta.url);
fs.writeFileSync(dest, JSON.stringify(out, null, 1));
const n = Object.values(out);
console.log(`\nMatched ${n.length} FMA ids · la: ${n.filter(e => e.la).length} · tr: ${n.filter(e => e.tr).length}`);
