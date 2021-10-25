import gql from 'graphql-tag';

export const findAllDictionariesAQuery = gql`
  query findAllDictionariesA {
    findAllDictionariesA {
      id
      name
      dictionaryType
      description
      state
      image
    }
  }
`;
