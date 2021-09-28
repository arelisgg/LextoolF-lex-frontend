import gql from 'graphql-tag';

export const getAllOcurrenceRecordsQuery = gql`
  query getAllOcurrenceRecords {
    getAllOcurrenceRecords {
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

export const getOcurrenceRecordByIDQuery = gql`
  query getOcurrenceRecordByID($orID: String!) {
    getOcurrenceRecordByID(orID: $orID) {
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
