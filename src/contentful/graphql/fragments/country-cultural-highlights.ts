import { gql } from "@apollo/client";

export const COUNTRY_CULTURAL_HIGHLIGHTS_FIELDS = gql`
  fragment CountryCulturalHighlightsFields on CountryCulturalHighlights {
    sys {
      id
      publishedAt
      firstPublishedAt
    }
    internalName
    description
    tags
  }
`;
