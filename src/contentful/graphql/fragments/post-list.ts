import { gql } from "@apollo/client";

import { ASSET_FIELDS } from "@/contentful/graphql/fragments/asset";
import { ENTRY_SYS_FIELDS } from "@/contentful/graphql/fragments/entry-sys";

export const POST_LIST_FIELDS = gql`
  fragment PostListFields on Post {
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
    }
  }
  ${ENTRY_SYS_FIELDS}
  ${ASSET_FIELDS}
`;
