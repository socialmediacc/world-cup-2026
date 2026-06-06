import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";

export const HOME_HERO_FIELDS = gql`
  fragment HomeHeroFields on HomeHero {
    title
    description
    heroImage {
      ...AssetFields
    }
  }
  ${ASSET_FIELDS}
`;
