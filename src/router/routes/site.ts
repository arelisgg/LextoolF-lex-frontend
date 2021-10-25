import { RouteRecordRaw } from 'vue-router';

const home = () => import('@/components/pages/home.vue');
const sources = () => import('@/components/pages/sourcesA/sources.vue');
const entries = () => import('@/components/pages/entryA/entries.vue');
const dictionaryA = () =>
  import('@/components/pages/dictionaryA/dictionaryA.vue');
const lemario = () => import('@/components/pages/lemarioA/lemario.vue');
const extractionTask = () =>
  import('@/components/pages/entryA/extractionTask.vue');
const newEntryA = () => import('@/components/pages/entryA/newEntryA.vue');
const newSource = () => import('@/components/pages/sourcesA/newSource.vue');
const documentationTask = () =>
  import('@/components/pages/ocurrenceRecordA/documentationTask.vue');
const newOcurrenceRecord = () =>
  import('@/components/pages/ocurrenceRecordA/newOcurrenceRecord.vue');
const newVariationRecord = () =>
  import('@/components/pages/ocurrenceRecordA/newVariationRecord.vue');
const firstEntrySource = () =>
  import('@/components/pages/entryA/firstEntrySource.vue');
const entrySelection = () =>
  import('@/components/pages/entryA/entrySelection.vue');
const entryLematization = () =>
  import('@/components/pages/lemarioA/entryLematization.vue');
const extractionSources = () =>
  import('@/components/pages/reportes/extractionSources.vue');
const documentationSources = () =>
  import('@/components/pages/reportes/documentationSources.vue');
const excludedEntries = () =>
  import('@/components/pages/reportes/excludedEntries.vue');
const editSourceOral = () =>
  import('@/components/pages/sourcesA/editSource/editSourceOral.vue');
const editSourceDictionary = () =>
  import('@/components/pages/sourcesA/editSource/editSourceDictionary.vue');
const editSourceEscrita = () =>
  import('@/components/pages/sourcesA/editSource/editSourceEscrita.vue');
const editVRAppearances = () =>
  import('@/components/pages/ocurrenceRecordA/edit/editVRAppearances.vue');
const editORAppearances = () =>
  import('@/components/pages/ocurrenceRecordA/edit/editORAppearances.vue');
const lemarioFinal = () =>
  import('@/components/pages/lemarioA/lemarioFinal.vue');
///////////////
const editEntryA = () => import('@/components/pages/entryA/editEntryA.vue');
const editEntryAExtracted = () =>
  import('@/components/pages/entryA/editEntryExtracted.vue');
const editEntryALemario = () =>
  import('@/components/pages/lemarioA/editEntryALemario.vue');
const editEntryAFinal = () =>
  import('@/components/pages/lemarioA/editEntryFinal.vue');
const editEntryASource = () =>
  import('@/components/pages/sourcesA/editEntryASource.vue');
const editEntryAExcluded = () =>
  import('@/components/pages/reportes/editEntryAExcluded.vue');

export const SiteRoutes: RouteRecordRaw[] & any = [
  {
    name: 'home',
    exact: true,
    path: '',
    component: home,
  },
  {
    name: 'lemarioFinal',
    exact: true,
    path: 'lemarioFinal',
    component: lemarioFinal,
  },
  {
    name: 'firstExtraction',
    exact: true,
    path: 'firstExtraction',
    component: sources,
  },
  {
    name: 'newSourceA',
    exact: true,
    path: 'newSourceA',
    component: newSource,
  },
  {
    name: 'editSourceOral',
    exact: true,
    path: 'editSourceOral/:id',
    component: editSourceOral,
  },
  {
    name: 'editSourceEscrita',
    exact: true,
    path: 'editSourceEscrita/:id',
    component: editSourceEscrita,
  },
  {
    name: 'editSourceDictionary',
    exact: true,
    path: 'editSourceDictionary/:id',
    component: editSourceDictionary,
  },
  {
    name: 'dictionaryA',
    exact: true,
    path: 'dictionaryA',
    component: dictionaryA,
  },
  {
    name: 'lemario',
    exact: true,
    path: 'lemario',
    component: lemario,
  },
  {
    name: 'extractionTask',
    exact: true,
    path: 'extractionTask/:source',
    component: extractionTask,
  },
  {
    name: 'newEntryA',
    exact: true,
    path: 'newEntryA/:source',
    component: newEntryA,
  },
  {
    name: 'firstEntry',
    exact: true,
    path: 'firstEntry',
    component: firstEntrySource,
  },
  {
    name: 'editEntryA',
    exact: true,
    path: 'editEntryA/:id',
    component: editEntryA,
  },
  {
    name: 'editEntryALemario',
    exact: true,
    path: 'editEntryA/:id',
    component: editEntryALemario,
  },
  {
    name: 'editEntryAFinal',
    exact: true,
    path: 'editEntryA/:id',
    component: editEntryAFinal,
  },
  {
    name: 'editEntryAExtracted',
    exact: true,
    path: 'editEntryA/:id',
    component: editEntryAExtracted,
  },
  {
    name: 'editEntryAExcluded',
    exact: true,
    path: 'editEntryA/:id',
    component: editEntryAExcluded,
  },
  {
    name: 'editEntryASource',
    exact: true,
    path: 'editEntryA/:id',
    component: editEntryASource,
  },
  {
    name: 'entries',
    exact: true,
    path: 'entries',
    component: entries,
  },
  {
    name: 'documentationTask',
    exact: true,
    path: 'documentationTask',
    component: documentationTask,
  },
  {
    name: 'newOcurrenceRecord',
    exact: true,
    path: 'newOcurrenceRecord/:id',
    component: newOcurrenceRecord,
  },
  {
    name: 'newVariationRecord',
    exact: true,
    path: 'newVariationRecord/:id',
    component: newVariationRecord,
  },
  {
    name: 'editVRAppearances',
    exact: true,
    path: 'editVRAppearances/:id',
    component: editVRAppearances,
  },
  {
    name: 'editORAppearances',
    exact: true,
    path: 'editORAppearances/:id',
    component: editORAppearances,
  },
  {
    name: 'entrySelection',
    exact: true,
    path: 'entrySelection',
    component: entrySelection,
  },
  {
    name: 'entryLematization',
    exact: true,
    path: 'entryLematization',
    component: entryLematization,
  },
  {
    name: 'documentationSources',
    exact: true,
    path: 'documentationSources',
    component: documentationSources,
  },
  {
    name: 'extractionSources',
    exact: true,
    path: 'extractionSources',
    component: extractionSources,
  },
  {
    name: 'excludedEntries',
    exact: true,
    path: 'excludedEntries',
    component: excludedEntries,
  },
];
