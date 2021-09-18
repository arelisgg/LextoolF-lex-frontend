import gql from 'graphql-tag';

export const deleteEntryByIDMutation = gql`
  mutation deleteEntryByID($entryID: String!) {
    deleteEntryByID(entryID: $entryID) {
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

export const deleteEntryDocByIDMutation = gql`
  mutation deleteEntryDocByID($orID: String!, $entryID: String!) {
    deleteEntryDocByID(orID: $orID, entryID: $entryID) {
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

export const createEntryMutation = gql`
  mutation createEntry($createdEntry: NewEntryType!) {
    createEntry(createdEntry: $createdEntry) {
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

export const updateEntryByIDMutation = gql`
  mutation updateEntryByID($newEntry: EditedEntryType!) {
    updateEntryByID(newEntry: $newEntry) {
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

export const updateEntryDocumentationMutation = gql`
  mutation updateEntryDocumentation($newEntry: EditedEntryType!) {
    updateEntryDocumentation(newEntry: $newEntry) {
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
