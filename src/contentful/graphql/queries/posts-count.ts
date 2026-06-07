import { gql } from "@apollo/client";

export const POSTS_COUNT_QUERY = gql`
  query PostsCount($locale: String, $preview: Boolean = false) {
    postCollection(limit: 0, locale: $locale, preview: $preview) {
      total
    }
  }
`;

export type PostsCountQueryVariables = {
  locale?: string;
  preview?: boolean;
};
