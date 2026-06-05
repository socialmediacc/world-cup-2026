import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";
import { ENTRY_SYS_FIELDS } from "@/contentful/graphql/fragments/entry-sys";
import { PAGE_SEO_FIELDS } from "@/contentful/graphql/fragments/page-seo";

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    ...EntrySysFields
    title
    slug
    categories
    author
    featuredImage {
      ...AssetFields
    }
    content {
      json
      links {
        assets {
          block {
            sys {
              id
            }
            ...AssetFields
          }
        }
      }
    }
    seo {
      ...PageSeoFields
    }
  }
  ${ENTRY_SYS_FIELDS}
  ${ASSET_FIELDS}
  ${PAGE_SEO_FIELDS}
`;
