import { gql } from "@apollo/client";

import { POST_LIST_FIELDS } from "@/contentful/graphql/fragments/post-list";

export const POSTS_QUERY = gql`
  query Posts(
    $locale: String
    $preview: Boolean = false
    $limit: Int = 10
    $skip: Int = 0
  ) {
    postCollection(
      limit: $limit
      skip: $skip
      order: [sys_firstPublishedAt_DESC]
      locale: $locale
      preview: $preview
    ) {
      total
      items {
        ...PostListFields
      }
    }
  }
  ${POST_LIST_FIELDS}
`;

export type PostsQueryVariables = {
  locale?: string;
  preview?: boolean;
  limit?: number;
  skip?: number;
};
