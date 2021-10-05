import gql from 'graphql-tag';

export const createNomenclatorMutation = gql`
  mutation createNomenclator($newNomenclator: NewNomenclatorType!) {
    createNomenclator(newNomenclator: $newNomenclator) {
      id
      themes {
        nombre
      }
      genres {
        nombre
      }
      sessions_p {
        nombre
      }
      dictionaryTypes {
        nombre
      }
      typologies {
        nombre
      }
    }
  }
`;
export const addThemeMutation = gql`
  mutation addTheme($newTheme: NewThemeType!) {
    addTheme(newTheme: $newTheme) {
      id
      themes {
        nombre
      }
      genres {
        nombre
      }
      sessions_p {
        nombre
      }
      dictionaryTypes {
        nombre
      }
      typologies {
        nombre
      }
    }
  }
`;
export const addGenresMutation = gql`
  mutation addGenres($newGenre: NewGenreType!) {
    addGenres(newGenre: $newGenre) {
      id
      themes {
        nombre
      }
      genres {
        nombre
      }
      sessions_p {
        nombre
      }
      dictionaryTypes {
        nombre
      }
      typologies {
        nombre
      }
    }
  }
`;
export const addTypologyMutation = gql`
  mutation addTypology($newTypology: NewTypologyType!) {
    addTypology(newTypology: $newTypology) {
      id
      themes {
        nombre
      }
      genres {
        nombre
      }
      sessions_p {
        nombre
      }
      dictionaryTypes {
        nombre
      }
      typologies {
        nombre
      }
    }
  }
`;
export const addSessionPMutation = gql`
  mutation addSessionP($newSessionP: NewSession_pType!) {
    addSessionP(newSessionP: $newSessionP) {
      id
      themes {
        nombre
      }
      genres {
        nombre
      }
      sessions_p {
        nombre
      }
      dictionaryTypes {
        nombre
      }
      typologies {
        nombre
      }
    }
  }
`;
export const addDictionaryTypeMutation = gql`
  mutation addDictionaryType($newDictionaryType: NewDictionaryTypeType!) {
    addDictionaryType(newDictionaryType: $newDictionaryType) {
      id
      themes {
        nombre
      }
      genres {
        nombre
      }
      sessions_p {
        nombre
      }
      dictionaryTypes {
        nombre
      }
      typologies {
        nombre
      }
    }
  }
`;
