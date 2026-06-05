import { gql } from "@apollo/client";

import { POST_FIELDS } from "@/contentful/graphql/fragments/post";

export const POST_BY_SLUG_QUERY = gql`
  query PostBySlug($slug: String!, $locale: String, $preview: Boolean = false) {
    postCollection(
      limit: 1
      where: { slug: $slug }
      locale: $locale
      preview: $preview
    ) {
      items {
        ...PostFields
      }
    }
  }
  ${POST_FIELDS}
`;

export type PostBySlugQueryVariables = {
  slug: string;
  locale?: string;
  preview?: boolean;
};
