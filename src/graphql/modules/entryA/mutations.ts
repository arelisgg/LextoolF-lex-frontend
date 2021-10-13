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
      criteria
      included
      frecuency
    }
  }
`;

export const deleteEntryDocByIDMutation = gql`
  mutation deleteEntryDocByID($entryID: String!, $orID: String!) {
    deleteEntryDocByID(entryID: $entryID, orID: $orID) {
      id
      lemma
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
      criteria
      included
      frecuency
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
      criteria
      included
      frecuency
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
      criteria
      included
      frecuency
      documentation
    }
  }
`;

export const updateEntryFrecuencyMutation = gql`
  mutation updateEntryFrecuency($entryID: String!) {
    updateEntryFrecuency(entryID: $entryID) {
      id
      lemma
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
