import { gql } from "@apollo/client";

export const FAST_FACT_ITEM_FIELDS = gql`
  fragment FastFactItemFields on FastFactItem {
    sys {
      id
      publishedAt
      firstPublishedAt
    }
    internalName
    label
    value
    icon
  }
`;
