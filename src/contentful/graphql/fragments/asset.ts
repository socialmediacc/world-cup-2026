import { gql } from "@apollo/client";

export const ASSET_FIELDS = gql`
  fragment AssetFields on Asset {
    sys {
      id
    }
    title
    description
    url
    width
    height
    contentType
  }
`;
