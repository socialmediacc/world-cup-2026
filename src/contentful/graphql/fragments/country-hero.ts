import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";

export const COUNTRY_HERO_FIELDS = gql`
  fragment CountryHeroFields on CountryHero {
    title
    description
    backgroundImage {
      ...AssetFields
    }
  }
  ${ASSET_FIELDS}
`;
