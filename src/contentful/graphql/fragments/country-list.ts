import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";

export const COUNTRY_LIST_FIELDS = gql`
  fragment CountryListFields on CountryProfile {
    name
    slug
    flag {
      ...AssetFields
    }
  }
  ${ASSET_FIELDS}
`;
