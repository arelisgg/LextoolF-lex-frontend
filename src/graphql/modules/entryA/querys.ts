import gql from 'graphql-tag';

export const findAllEntriesQuery = gql`
  query findAllEntries {
    findAllEntries {
      id
      lemma
      letter
      context
      UF
      source
      selected
    }
  }
`;

export const findAllEntriesWithDocsQuery = gql`
  query findAllEntriesWithDocs {
    findAllEntriesWithDocs {
      id
      lemma
      letter
      context
      UF
      source
      selected
      id
      documentation
    }
  }
`;

export const getEntryByIDWithDocsQuery = gql`
  query getEntryByIDWithDocs($entryID: String!) {
    getEntryByIDWithDocs(entryID: $entryID) {
      id
      lemma
      letter
      context
      UF
      source
      selected
      documentation
    }
  }
`;

export const getEntryByIDQuery = gql`
  query getEntryByID($entryID: String!) {
    getEntryByID(entryID: $entryID) {
      id
      lemma
      letter
      context
      UF
      source
      selected
    }
  }
`;

export const getAllEntriesBySourceIDQuery = gql`
  query getAllEntriesBySourceID($sourceID: String!) {
    getAllEntriesBySourceID(sourceID: $sourceID) {
      id
      lemma
      letter
      context
      UF
      source
      selected
    }
  }
`;

export const findAllEntriesWithSourceRefQuery = gql`
  query findAllEntriesWithSourceRef {
    findAllEntriesWithSourceRef {
      id
      lemma
      letter
      context
      UF
      source
      selected
    }
  }
`;
