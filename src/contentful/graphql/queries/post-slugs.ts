import { gql } from "@apollo/client";

export const POST_SLUGS_QUERY = gql`
  query PostSlugs($locale: String, $preview: Boolean = false, $limit: Int = 100) {
    postCollection(
      limit: $limit
      order: [title_ASC]
      locale: $locale
      preview: $preview
    ) {
      items {
        slug
      }
    }
  }
`;

export type PostSlugsQueryVariables = {
  locale?: string;
  preview?: boolean;
  limit?: number;
};
