import gql from 'graphql-tag';

export const findAllEntriesQuery = gql`
  query findAllEntries {
    findAllEntries {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
    }
  }
`;

export const findAllEntriesWithDocsQuery = gql`
  query findAllEntriesWithDocs {
    findAllEntriesWithDocs {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
      documentation
    }
  }
`;

export const getEntryByIDWithDocsQuery = gql`
  query getEntryByIDWithDocs($entryID: String!) {
    getEntryByIDWithDocs(entryID: $entryID) {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
      documentation
    }
  }
`;

export const getEntryByIDQuery = gql`
  query getEntryByID($entryID: String!) {
    getEntryByID(entryID: $entryID) {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
    }
  }
`;

export const getAllEntriesBySourceIDQuery = gql`
  query getAllEntriesBySourceID($sourceID: String!) {
    getAllEntriesBySourceID(sourceID: $sourceID) {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
    }
  }
`;

export const findAllEntriesWithSourceRefQuery = gql`
  query findAllEntriesWithSourceRef {
    findAllEntriesWithSourceRef {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
    }
  }
`;

export const getAllExcludedEntriesQuery = gql`
  query getAllExcludedEntries {
    getAllExcludedEntries {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
      documentation
    }
  }
`;

export const getAllIncludedEntriesQuery = gql`
  query getAllIncludedEntries {
    getAllIncludedEntries {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
      documentation
    }
  }
`;

export const getAllEntriesToSelectQuery = gql`
  query getAllEntriesToSelect {
    getAllEntriesToSelect {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
      documentation
    }
  }
`;

export const getAllEntriesToDocumentQuery = gql`
  query getAllEntriesToDocument {
    getAllEntriesToDocument {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
      documentation
    }
  }
`;

export const getAllEntriesOfLemarioQuery = gql`
  query getAllEntriesOfLemario {
    getAllEntriesOfLemario {
      id
      lemma {
        lemma
      }
      letter
      context
      UF
      source
      selected
      criteria
      included
      frecuency
      documentation
    }
  }
`;
