import { apolloQuery, apolloMutate } from '@/graphql/apollo';
import {
  getAllOcurrenceRecordsQuery,
  getOcurrenceRecordByIDQuery,
} from './querys';
import { FetchPolicy, apolloClientA } from '@/graphql/apolloProvider';
import {
  createOcurrenceRecordMutation,
  deleteOcurrenceRecordByIDMutation,
  editOcurrenceRecordMutation,
} from './mutations';

export class OcurrenceRecord {
  static getAllOcurrenceRecords() {
    return apolloQuery(
      getAllOcurrenceRecordsQuery,
      null,
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static getOcurrenceRecordByID(orID: String) {
    return apolloQuery(
      getOcurrenceRecordByIDQuery,
      { orID },
      FetchPolicy.network_only,
      apolloClientA
    );
  }

  static createOcurrenceRecord(newOcurrenceRecord: any) {
    return apolloMutate(
      createOcurrenceRecordMutation,
      { newOcurrenceRecord: newOcurrenceRecord },
      null,
      null,
      apolloClientA
    );
  }

  static editOcurrenceRecord(newOcurrenceRecord: any) {
    return apolloMutate(
      editOcurrenceRecordMutation,
      { newOcurrenceRecord: newOcurrenceRecord },
      null,
      null,
      apolloClientA
    );
  }

  static deleteOcurrenceRecordByID(orID: String) {
    return apolloMutate(
      deleteOcurrenceRecordByIDMutation,
      { orID },
      null,
      null,
      apolloClientA
    );
  }
}
