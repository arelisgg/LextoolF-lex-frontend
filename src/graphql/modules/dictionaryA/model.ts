import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import { findAllDictionariesAQuery } from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  createDictionaryAMutation,
  deleteDictionaryAByIDMutation,
} from './mutations';

export class DictionaryA {
  static findAllDictionariesA() {
    return apolloQuery(
      findAllDictionariesAQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static createDictionaryA(createdDictionary: any) {
    return apolloMutate(
      createDictionaryAMutation,
      { createdDictionary: createdDictionary },
      null,
      null,
      apolloClientA
    );
  }

  static deleteDictionaryAByID(dictionaryID: String) {
    return apolloMutate(
      deleteDictionaryAByIDMutation,
      { dictionaryID },
      null,
      null,
      apolloClientA
    );
  }
}
