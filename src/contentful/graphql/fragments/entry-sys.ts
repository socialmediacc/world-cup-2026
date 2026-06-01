import { gql } from "@apollo/client";

/** Shared Contentful system fields for entries. */
export const ENTRY_SYS_FIELDS = gql`
  fragment EntrySysFields on Entry {
    sys {
      id
      publishedAt
      firstPublishedAt
    }
  }
`;
