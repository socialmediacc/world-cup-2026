import { gql } from "@apollo/client";

import { ENTRY_SYS_FIELDS } from "@/contentful/graphql/fragments/entry-sys";
import { PAGE_SEO_FIELDS } from "@/contentful/graphql/fragments/page-seo";

export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    ...EntrySysFields
    title
    slug
    body {
      json
    }
    seo {
      ...PageSeoFields
    }
  }
  ${ENTRY_SYS_FIELDS}
  ${PAGE_SEO_FIELDS}
`;
