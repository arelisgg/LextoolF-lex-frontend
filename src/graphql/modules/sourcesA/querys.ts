import gql from 'graphql-tag';

export const findAllSourcesQuery = gql`
  query findAllSources {
    findAllSources {
      id
      name
      ref
      type
      subType
      support
      bloque
      theme
      stage
      provice_p
      session_p
      magazine_type_p
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      recording_date
      broadcast_date
      dictionaryType
      century
      library_name
      url_location
    }
  }
`;

export const findAllDocumentationtionSourcesQuery = gql`
  query findAllDocumentationtionSources {
    findAllDocumentationtionSources {
      id
      name
      ref
      type
      subType
      support
      bloque
      theme
      stage
      provice_p
      session_p
      magazine_type_p
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      recording_date
      broadcast_date
      dictionaryType
      century
      library_name
      url_location
    }
  }
`;

export const findAllExtractionSourcesQuery = gql`
  query findAllExtractionSources {
    findAllExtractionSources {
      id
      name
      ref
      type
      subType
      support
      bloque
      theme
      stage
      provice_p
      session_p
      magazine_type_p
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      recording_date
      broadcast_date
      dictionaryType
      century
      library_name
      url_location
    }
  }
`;

export const getSourceByIDQuery = gql`
  query getSourceByID($sourceID: String!) {
    getSourceByID(sourceID: $sourceID) {
      id
      name
      ref
      type
      subType
      support
      bloque
      theme
      stage
      provice_p
      session_p
      magazine_type_p
      URL
      cantMin
      broadcastMedium
      typology
      speaker
      recording_date
      broadcast_date
      dictionaryType
      century
      library_name
      url_location
    }
  }
`;
