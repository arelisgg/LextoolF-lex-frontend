import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import {
  findAllEntriesQuery,
  getEntryByIDQuery,
  getAllEntriesBySourceIDQuery,
  findAllEntriesWithSourceRefQuery,
  findAllEntriesWithDocsQuery,
  getEntryByIDWithDocsQuery,
} from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  createEntryMutation,
  deleteEntryByIDMutation,
  updateEntryByIDMutation,
  updateEntryDocumentationMutation,
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
}
