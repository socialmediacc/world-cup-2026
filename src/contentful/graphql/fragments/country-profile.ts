import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";
import { COUNTRY_CULTURAL_HIGHLIGHTS_FIELDS } from "@/contentful/graphql/fragments/country-cultural-highlights";
import { COUNTRY_HERO_FIELDS } from "@/contentful/graphql/fragments/country-hero";
import { ENTRY_SYS_FIELDS } from "@/contentful/graphql/fragments/entry-sys";
import { FAST_FACT_ITEM_FIELDS } from "@/contentful/graphql/fragments/fast-fact-item";
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
    fastFactsCollection(limit: 20) {
      items {
        ...FastFactItemFields
      }
    }
    culturalHighlights {
      ...CountryCulturalHighlightsFields
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
  ${FAST_FACT_ITEM_FIELDS}
  ${COUNTRY_CULTURAL_HIGHLIGHTS_FIELDS}
  ${MATCH_FIELDS}
  ${PAGE_SEO_FIELDS}
`;
