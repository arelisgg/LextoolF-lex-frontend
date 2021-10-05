import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import {
  getAllDictionaryTypesQuery,
  getAllGenresQuery,
  getAllSessionsPQuery,
  getAllThemesQuery,
  getAllTypologiesQuery,
} from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  addDictionaryTypeMutation,
  addGenresMutation,
  addSessionPMutation,
  addThemeMutation,
  addTypologyMutation,
  createNomenclatorMutation,
} from './mutations';

export class Nomenclator {
  static getAllDictionaryTypes() {
    return apolloQuery(
      getAllDictionaryTypesQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllGenres() {
    return apolloQuery(
      getAllGenresQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllSessionsP() {
    return apolloQuery(
      getAllSessionsPQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllThemes() {
    return apolloQuery(
      getAllThemesQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getAllTypologies() {
    return apolloQuery(
      getAllTypologiesQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static addDictionaryType(newDictionaryType: any) {
    return apolloMutate(
      addDictionaryTypeMutation,
      { newDictionaryType: newDictionaryType },
      null,
      null,
      apolloClientA
    );
  }

  static addGenres(newGenre: any) {
    return apolloMutate(
      addGenresMutation,
      { newGenre: newGenre },
      null,
      null,
      apolloClientA
    );
  }

  static addSessionP(newSessionP: any) {
    return apolloMutate(
      addSessionPMutation,
      { newSessionP: newSessionP },
      null,
      null,
      apolloClientA
    );
  }

  static addTheme(newTheme: any) {
    return apolloMutate(
      addThemeMutation,
      { newTheme: newTheme },
      null,
      null,
      apolloClientA
    );
  }

  static addTypology(newTypology: any) {
    return apolloMutate(
      addTypologyMutation,
      { newTypology: newTypology },
      null,
      null,
      apolloClientA
    );
  }
  static createNomenclator(newNomenclator: any) {
    return apolloMutate(
      createNomenclatorMutation,
      { newNomenclator: newNomenclator },
      null,
      null,
      apolloClientA
    );
  }
}
