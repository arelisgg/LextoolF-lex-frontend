import gql from 'graphql-tag';

export const getAllThemesQuery = gql`
  query getAllThemes {
    getAllThemes {
      nombre
    }
  }
`;
export const getAllDictionaryTypesQuery = gql`
  query getAllDictionaryTypes {
    getAllDictionaryTypes {
      nombre
    }
  }
`;
export const getAllSessionsPQuery = gql`
  query getAllSessionsP {
    getAllSessionsP {
      nombre
    }
  }
`;
export const getAllTypologiesQuery = gql`
  query getAllTypologies {
    getAllTypologies {
      nombre
    }
  }
`;
export const getAllGenresQuery = gql`
  query getAllGenres {
    getAllGenres {
      nombre
    }
  }
`;
