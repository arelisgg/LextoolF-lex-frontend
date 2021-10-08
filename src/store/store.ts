import { reactive } from 'vue';
import { LayoutStore } from './modules/layout/layout.store';
import { SourcesStore } from './modules/sourcesA';
import { DictionaryAStore } from './modules/dictionaryA';
import { LemarioStore } from './modules/lemarioA';
import { EntryAStore } from './modules/entryA';
import { OcurrenceRecordStore } from './modules/ocurrenceRecord';
import { Nomenclator } from './modules/nomenclator';

export const store = reactive({
  layout: new LayoutStore(),
  sources: new SourcesStore(),
  dictionariesA: new DictionaryAStore(),
  lemario: new LemarioStore(),
  entriesA: [EntryAStore],
  entryA: new EntryAStore(),
  ocurrenceRecord: new OcurrenceRecordStore(),
  nomenclator: new Nomenclator(),
});
