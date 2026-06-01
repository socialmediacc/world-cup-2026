import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";
import { COUNTRY_HERO_FIELDS } from "@/contentful/graphql/fragments/country-hero";
import { ENTRY_SYS_FIELDS } from "@/contentful/graphql/fragments/entry-sys";
import { MATCH_FIELDS } from "@/contentful/graphql/fragments/match";
import { PAGE_SEO_FIELDS } from "@/contentful/graphql/fragments/page-seo";

export const COUNTRY_PROFILE_FIELDS = gql`
  fragment CountryProfileFields on CountryProfile {
    ...EntrySysFields
    name
    slug
    flag {
      ...AssetFields
    }
    hero {
      ...CountryHeroFields
    }
    matchesCollection(limit: 20) {
      items {
        ...MatchFields
      }
    }
    seo {
      ...PageSeoFields
    }
  }
  ${ENTRY_SYS_FIELDS}
  ${ASSET_FIELDS}
  ${COUNTRY_HERO_FIELDS}
  ${MATCH_FIELDS}
  ${PAGE_SEO_FIELDS}
`;
