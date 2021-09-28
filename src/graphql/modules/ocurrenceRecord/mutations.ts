import gql from 'graphql-tag';

export const deleteOcurrenceRecordByIDMutation = gql`
  mutation deleteOcurrenceRecordByID($orID: String!) {
    deleteOcurrenceRecordByID(orID: $orID) {
      id
      source
      numAppearance
      appearances {
        useContext
      }
      isVariation
      variationUF
      status
    }
  }
`;

export const createOcurrenceRecordMutation = gql`
  mutation createOcurrenceRecord($newOcurrenceRecord: NewOcurrenceRecordType!) {
    createOcurrenceRecord(newOcurrenceRecord: $newOcurrenceRecord) {
      id
      source
      numAppearance
      appearances {
        useContext
      }
      isVariation
      variationUF
      status
    }
  }
`;

export const editOcurrenceRecordMutation = gql`
  mutation editOcurrenceRecord($newOcurrenceRecord: NewOcurrenceRecordType!) {
    editOcurrenceRecord(newOcurrenceRecord: $newOcurrenceRecord) {
      id
      corpus_treasure
      numAppearance
      numSources
      appearances {
        useContext
        contextSource
      }
      isVariation
      variationUF
      status
    }
  }
`;
