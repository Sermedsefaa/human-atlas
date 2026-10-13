import type {Atlas,Concept} from './anatomy';
import {conceptDisplayLabel,conceptLatinLabel,matchesConceptQuery,termForId,type TermRecord,type TermsCatalog} from './terms.ts';
type Tool={name:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean};execute:(input:unknown)=>unknown};
function asRecord(input:unknown):Record<string,unknown>{if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Bir nesne bekleniyordu.');return input as Record<string,unknown>;}
function termEntry(terms:TermsCatalog|null|undefined,c:Concept):TermRecord{return terms?termForId(terms,c.id,c.name):{en:c.name,la:c.name,tr:c.name,search:[c.name.toLowerCase()]};}
export function atlasTools(atlas:Atlas,inspect:(concept:Concept)=>void,terms?:TermsCatalog|null):Tool[]{return [
 {name:'find_anatomy',description:'Bu atlas içinde Türkçe, Latince, İngilizce ad veya FMA kimliği ile anatomik yapı arar.',inputSchema:{type:'object',properties:{query:{type:'string',minLength:1}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true},execute(input){const data=asRecord(input);if(typeof data.query!=='string'||!data.query.trim())throw new Error('Boş olmayan bir arama metni gerekli.');const q=data.query.trim();return atlas.concepts.filter(c=>{const entry=termEntry(terms,c);return matchesConceptQuery(entry,c.id,q)||c.name.toLowerCase().includes(q.toLowerCase());}).slice(0,30).map(c=>{const entry=termEntry(terms,c);return {id:c.id,name:conceptDisplayLabel(entry),latin:conceptLatinLabel(entry),pieces:c.elements.length};});}},
 {name:'inspect_anatomical_structure',description:'Atlas kavramını 3B görünümde seçer ve ayrıntı panelini açar.',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){const data=asRecord(input);if(typeof data.id!=='string')throw new Error('Atlas kimliği gerekli.');const concept=atlas.concepts.find(c=>c.id===data.id);if(!concept)throw new Error('Bu yapı atlas içinde yok.');inspect(concept);const entry=termEntry(terms,concept);return {id:concept.id,name:conceptDisplayLabel(entry),latin:conceptLatinLabel(entry),selectedPieces:concept.elements.length};}}
 ];}
export function registerAtlasTools(atlas:Atlas,inspect:(concept:Concept)=>void,terms?:TermsCatalog|null){
 const context=(document as Document&{modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
 if(!context?.registerTool)return;const lifecycle=new AbortController();
 for(const tool of atlasTools(atlas,inspect,terms)){try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{/* Optional browser capability; the visible UI remains available. */}}
 return()=>lifecycle.abort();
}
