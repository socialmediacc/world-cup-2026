import { gql } from "@apollo/client";

import { PAGE_FIELDS } from "@/contentful/graphql/fragments/page";

export const PAGE_BY_SLUG_QUERY = gql`
  query PageBySlug(
    $slug: String!
    $locale: String
    $preview: Boolean = false
  ) {
    pageCollection(
      limit: 1
      where: { slug: $slug }
      locale: $locale
      preview: $preview
    ) {
      items {
        ...PageFields
      }
    }
  }
  ${PAGE_FIELDS}
`;

export type PageBySlugQueryVariables = {
  slug: string;
  locale?: string;
  preview?: boolean;
};
