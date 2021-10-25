import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import {
  findAllEntriesQuery,
  getEntryByIDQuery,
  getAllEntriesBySourceIDQuery,
  findAllEntriesWithSourceRefQuery,
  findAllEntriesWithDocsQuery,
  getEntryByIDWithDocsQuery,
  getAllEntriesToDocumentQuery,
  getAllEntriesToSelectQuery,
  getAllExcludedEntriesQuery,
  getAllIncludedEntriesQuery,
  getAllEntriesOfLemarioQuery,
} from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  createEntryMutation,
  deleteEntryByIDMutation,
  updateEntryByIDMutation,
  updateEntryDocumentationMutation,
  deleteEntryDocByIDMutation,
  updateEntryFrecuencyMutation,
} from './mutations';

export class EntryA {
  static findAllEntries() {
    return apolloQuery(
      findAllEntriesQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static findAllEntriesWithDocs() {
    return apolloQuery(
      findAllEntriesWithDocsQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static findAllEntriesWithSourceRef() {
    return apolloQuery(
      findAllEntriesWithSourceRefQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getEntryByIDWithDocs(entryID: String) {
    return apolloQuery(
      getEntryByIDWithDocsQuery,
      { entryID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getEntryByID(entryID: String) {
    return apolloQuery(
      getEntryByIDQuery,
      { entryID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllEntriesBySourceID(sourceID: String) {
    return apolloQuery(
      getAllEntriesBySourceIDQuery,
      { sourceID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static createEntry(createdEntry: any) {
    return apolloMutate(
      createEntryMutation,
      { createdEntry: createdEntry },
      null,
      null,
      apolloClientA
    );
  }

  static updateEntryByID(newEntry: any) {
    return apolloMutate(
      updateEntryByIDMutation,
      { newEntry: newEntry },
      null,
      null,
      apolloClientA
    );
  }

  static updateEntryDocumentation(newEntry: any) {
    return apolloMutate(
      updateEntryDocumentationMutation,
      { newEntry: newEntry },
      null,
      null,
      apolloClientA
    );
  }

  static deleteEntryByID(entryID: String) {
    return apolloMutate(
      deleteEntryByIDMutation,
      { entryID },
      null,
      null,
      apolloClientA
    );
  }

  static deleteEntryDocByID(entryID: String, orID: String) {
    return apolloMutate(
      deleteEntryDocByIDMutation,
      { entryID, orID },
      null,
      null,
      apolloClientA
    );
  }

  static updateEntryFrecuency(entryID: String) {
    return apolloMutate(
      updateEntryFrecuencyMutation,
      { entryID: entryID },
      null,
      null,
      apolloClientA
    );
  }

  static getAllExcludedEntries() {
    return apolloQuery(
      getAllExcludedEntriesQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllEntriesOfLemario() {
    return apolloQuery(
      getAllEntriesOfLemarioQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllIncludedEntries() {
    return apolloQuery(
      getAllIncludedEntriesQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllEntriesToSelect() {
    return apolloQuery(
      getAllEntriesToSelectQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllEntriesToDocument() {
    return apolloQuery(
      getAllEntriesToDocumentQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }
}
