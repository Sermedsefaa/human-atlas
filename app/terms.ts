export interface TermRecord {
  en: string;
  la: string;
  tr: string;
  alt?: string[];
  search: string[];
}

export interface TermsCatalog {
  version: number;
  generated?: string;
  entries: Record<string, TermRecord>;
}

let cache: TermsCatalog | null = null;
let loadPromise: Promise<TermsCatalog> | null = null;

export function normalizeTurkish(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export async function loadTerms(): Promise<TermsCatalog> {
  if (cache) return cache;
  if (!loadPromise) {
    loadPromise = fetch('/models/terms.tr.json')
      .then(r => {
        if (!r.ok) throw new Error('Terim sözlüğü yüklenemedi.');
        return r.json() as Promise<TermsCatalog>;
      })
      .then(data => {
        cache = data;
        return data;
      });
  }
  return loadPromise;
}

export function termForId(catalog: TermsCatalog, id: string, fallbackEn: string): TermRecord {
  const hit = catalog.entries[id];
  if (hit) return hit;
  return {en: fallbackEn, la: fallbackEn, tr: fallbackEn, search: [normalizeTurkish(fallbackEn)]};
}

export function conceptDisplayLabel(record: TermRecord): string {
  return record.tr;
}

export function conceptLatinLabel(record: TermRecord): string {
  return record.la;
}

export function conceptSearchHaystack(record: TermRecord): string {
  return record.search.join(' ');
}

export function matchesConceptQuery(record: TermRecord, id: string, query: string): boolean {
  const q = normalizeTurkish(query);
  if (!q) return true;
  if (normalizeTurkish(id).includes(q)) return true;
  if (conceptSearchHaystack(record).includes(q)) return true;
  return false;
}
