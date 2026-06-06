import { gql } from "@apollo/client";

import { ENTRY_SYS_FIELDS } from "@/contentful/graphql/fragments/entry-sys";
import { HOME_HERO_FIELDS } from "@/contentful/graphql/fragments/home-hero";
import { PAGE_SEO_FIELDS } from "@/contentful/graphql/fragments/page-seo";

export const HOME_PAGE_FIELDS = gql`
  fragment HomePageFields on HomePage {
    ...EntrySysFields
    slug
    hero {
      ...HomeHeroFields
    }
    seo {
      ...PageSeoFields
    }
  }
  ${ENTRY_SYS_FIELDS}
  ${HOME_HERO_FIELDS}
  ${PAGE_SEO_FIELDS}
`;
