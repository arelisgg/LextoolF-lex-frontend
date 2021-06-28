import gql from 'graphql-tag';

export const deleteStudyByIDMutation = gql`
  mutation deleteStudyByID($studyID: String!) {
    deleteStudyByID(studyID: $studyID) {
      id
      name
    }
  }
`;

export const createStudyMutation = gql`
  mutation createStudyMutation($fraseograficStudy: NewfraseograficStudyType!) {
    createStudy(fraseograficStudy: $fraseograficStudy) {
      id
      name
      period
      dictionaries
    }
  }
`;

export const editStudyMutation = gql`
  mutation editStudy($newStudy: EditfraseograficStudyType!) {
    editStudy(newStudy: $newStudy) {
      id
      name
      period
      dictionaries {
        id
        name
        annoOfPublication
        author {
          name
          siglas
        }
        reference
        letters
        shortName
      }
    }
  }
`;
