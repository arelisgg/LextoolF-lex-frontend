import gql from 'graphql-tag';

export const getAllOcurrenceRecordsQuery = gql`
  query getAllOcurrenceRecords {
    getAllOcurrenceRecords {
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

export const getOcurrenceRecordByIDQuery = gql`
  query getOcurrenceRecordByID($orID: String!) {
    getOcurrenceRecordByID(orID: $orID) {
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
