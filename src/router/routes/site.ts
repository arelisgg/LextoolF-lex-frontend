import { RouteRecordRaw } from 'vue-router';

const home = () => import('@/components/pages/home.vue');

const sources = () => import('@/components/pages/sourcesA/sources.vue');
const entries = () => import('@/components/pages/entryA/entries.vue');
const dictionariesA = () =>
  import('@/components/pages/dictionaryA/dictionariesA.vue');
const newDictionaryA = () =>
  import('@/components/pages/dictionaryA/newDictionaryA.vue');
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
const editEntryA = () => import('@/components/pages/entryA/editEntryA.vue');

export const SiteRoutes: RouteRecordRaw[] & any = [
  {
    name: 'home',
    exact: true,
    path: '',
    component: home,
  },
  {
    name: 'sources',
    exact: true,
    path: 'sources',
    component: sources,
  },
  {
    name: 'newSourceA',
    exact: true,
    path: 'newSourceA',
    component: newSource,
  },
  {
    name: 'dictionariesA',
    exact: true,
    path: 'dictionariesA',
    component: dictionariesA,
  },
  {
    name: 'newDictionaryA',
    exact: true,
    path: 'newDictionaryA',
    component: newDictionaryA,
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
    path: 'newOcurrenceRecord',
    component: newOcurrenceRecord,
  },
  {
    name: 'newVariationRecord',
    exact: true,
    path: 'newVariationRecord',
    component: newVariationRecord,
  },
];
