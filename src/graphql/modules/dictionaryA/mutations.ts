import gql from 'graphql-tag';

export const deleteDictionaryAByIDMutation = gql`
  mutation deleteDictionaryByID($dictionaryID: String!) {
    deleteDictionaryByID(dictionaryID: $dictionaryID) {
      id
      name
      description
      state
      image
      dictionaryType
    }
  }
`;

export const createDictionaryAMutation = gql`
  mutation createDictionary($createdDictionary: NewDictionaryType!) {
    createDictionary(createdDictionary: $createdDictionary) {
      id
      name
      description
      state
      image
      dictionaryType
    }
  }
`;
