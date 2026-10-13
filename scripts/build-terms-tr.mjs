// Builds public/models/terms.tr.json from atlas concepts, Wikidata labels, and PDF glossary.
// Usage: node scripts/build-terms-tr.mjs
import fs from 'node:fs';

const atlas = JSON.parse(fs.readFileSync(new URL('../public/models/atlas.json', import.meta.url)));
const wiki = JSON.parse(fs.readFileSync(new URL('./data/wikidata-terms.json', import.meta.url)));
const glossary = JSON.parse(fs.readFileSync(new URL('./data/glossary-pdf.json', import.meta.url)));

/** @type {Map<string, string>} */
const laPhrase = new Map();
/** @type {Map<string, string>} */
const laWord = new Map();
for (const section of Object.values(glossary)) {
  if (!Array.isArray(section)) continue;
  for (const row of section) {
    if (!row.la || !row.tr) continue;
    laPhrase.set(row.la.toLowerCase(), row.tr);
    for (const w of row.la.split(/[\s,()]+/)) {
      const key = w.toLowerCase();
      if (key.length > 2 && !laWord.has(key)) laWord.set(key, row.tr.split(/[,;]/)[0].trim());
    }
  }
}

/** @type {Map<string, string>} */
const enExact = new Map();
for (const c of atlas.concepts) {
  const w = wiki[c.id];
  if (w?.tr) enExact.set(c.name.toLowerCase(), pickTr(w));
}

const enToken = new Map([
  ['heart', 'kalp'],
  ['liver', 'karaciğer'],
  ['brain', 'beyin'],
  ['stomach', 'mide'],
  ['spleen', 'dalak'],
  ['pancreas', 'pankreas'],
  ['kidney', 'böbrek'],
  ['lung', 'akciğer'],
  ['lungs', 'akciğerler'],
  ['femur', 'femur'],
  ['skull', 'kafatası'],
  ['bone', 'kemik'],
  ['muscle', 'kas'],
  ['artery', 'arter'],
  ['arteries', 'arterler'],
  ['vein', 'ven'],
  ['veins', 'venler'],
  ['nerve', 'sinir'],
  ['nerves', 'sinirler'],
  ['region', 'bölge'],
  ['wall', 'duvar'],
  ['segment', 'segment'],
  ['part', 'parça'],
  ['branch', 'dal'],
  ['branches', 'dallar'],
  ['right', 'sağ'],
  ['left', 'sol'],
  ['superior', 'üst'],
  ['inferior', 'alt'],
  ['anterior', 'ön'],
  ['posterior', 'arka'],
  ['medial', 'iç'],
  ['lateral', 'dış'],
  ['of', ''],
  ['the', ''],
  ['and', 've'],
  ['or', 'veya'],
  ['body', 'vücut'],
  ['organ', 'organ'],
  ['surface', 'yüzey'],
  ['tree', 'ağacı'],
  ['variant', 'varyant'],
  ['common', 'ortak'],
  ['internal', 'iç'],
  ['external', 'dış'],
  ['middle', 'orta'],
  ['small', 'küçük'],
  ['large', 'büyük'],
  ['major', 'büyük'],
  ['minor', 'küçük'],
  ['head', 'baş'],
  ['neck', 'boyun'],
  ['chest', 'göğüs'],
  ['abdomen', 'karın'],
  ['pelvis', 'pelvis'],
  ['arm', 'kol'],
  ['leg', 'bacak'],
  ['hand', 'el'],
  ['foot', 'ayak'],
  ['eye', 'göz'],
  ['ear', 'kulak'],
  ['skin', 'deri'],
  ['bladder', 'mesane'],
  ['urinary', 'idrar'],
  ['esophagus', 'yemek borusu'],
  ['trachea', 'soluk borusu'],
  ['diaphragm', 'diyafram'],
  ['aorta', 'aort'],
  ['vena', 'ven'],
  ['cava', 'kava'],
]);

for (const [en, tr] of enExact) {
  for (const w of en.split(/\s+/)) {
    if (w.length > 3 && !enToken.has(w)) enToken.set(w, tr.split(/\s+/)[0]?.toLowerCase() ?? w);
  }
}

function pickTr(w) {
  if (w.tr && /[ğüşıöçĞÜŞİÖÇ]/.test(w.tr)) return w.tr;
  if (w.trAlt?.length) {
    const turkish = w.trAlt.find(t => /[ğüşıöçĞÜŞİÖÇ]/.test(t));
    if (turkish) return turkish;
    return w.tr ?? w.trAlt[0];
  }
  return w.tr ?? '';
}

function latinToTurkish(la) {
  const key = la.toLowerCase().trim();
  if (laPhrase.has(key)) return laPhrase.get(key);
  const parts = la.split(/\s+/).filter(Boolean);
  const out = parts.map(p => {
    const w = p.toLowerCase().replace(/[(),]/g, '');
    return laWord.get(w) ?? laWord.get(w.replace(/us$/, '')) ?? p;
  });
  return out.join(' ').replace(/\s+/g, ' ').trim();
}

function englishToTurkish(en) {
  const key = en.toLowerCase().trim();
  if (enExact.has(key)) return enExact.get(key);
  const tokens = key.split(/[\s,/()-]+/).filter(Boolean);
  const tr = tokens.map(t => enToken.get(t) ?? t).filter(Boolean);
  const joined = tr.join(' ').replace(/\s+/g, ' ').trim();
  return joined || en;
}

function latinFromEnglish(en) {
  const tokens = en.toLowerCase().split(/\s+/);
  const laTokens = tokens.map(t => {
    const flip = {
      artery: 'arteria',
      vein: 'vena',
      nerve: 'nervus',
      muscle: 'musculus',
      bone: 'os',
      heart: 'cor',
      liver: 'hepar',
      stomach: 'ventriculus',
      kidney: 'ren',
      lung: 'pulmo',
      brain: 'encephalon',
      region: 'regio',
      wall: 'paries',
      superior: 'superior',
      inferior: 'inferior',
      anterior: 'anterior',
      posterior: 'posterior',
      right: 'dexter',
      left: 'sinister',
    };
    return flip[t] ?? t;
  });
  return laTokens.join(' ');
}

function normalizeSearch(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** @type {Record<string, {en:string, la:string, tr:string, alt?:string[]}>} */
const entries = {};
let wikiTr = 0;
let glossaryTr = 0;
let heuristicTr = 0;

for (const c of atlas.concepts) {
  const w = wiki[c.id] ?? {};
  const en = c.name;
  let la = w.la?.trim() || latinFromEnglish(en);
  let tr = pickTr(w);
  let source = 'wiki';
  if (!tr) {
    tr = latinToTurkish(la);
    source = 'glossary';
  }
  if (!tr || tr === la || !/[ğüşıöçĞÜŞİÖÇ]/.test(tr)) {
    const fromEn = englishToTurkish(en);
    if (fromEn && fromEn !== en) {
      tr = fromEn;
      source = 'en';
    }
  }
  if (!tr) tr = en;
  if (source === 'wiki') wikiTr++;
  else if (source === 'glossary') glossaryTr++;
  else heuristicTr++;

  const alt = new Set();
  if (w.trAlt) for (const a of w.trAlt) alt.add(a);
  alt.add(en);
  alt.add(la);
  const search = [...new Set([tr, en, la, ...alt].map(normalizeSearch).filter(Boolean))];

  entries[c.id] = {en, la, tr, ...(alt.size ? {alt: [...alt]} : {}), search};
}

const catalog = {
  version: 1,
  generated: new Date().toISOString(),
  stats: {concepts: atlas.concepts.length, wikiTr, glossaryTr, heuristicTr},
  entries,
};

fs.writeFileSync(new URL('../public/models/terms.tr.json', import.meta.url), JSON.stringify(catalog));
console.log(`Wrote public/models/terms.tr.json · ${JSON.stringify(catalog.stats)}`);
