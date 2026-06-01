import { gql } from "@apollo/client";

import { PAGE_FIELDS } from "@/contentful/graphql/fragments/page";

export const PAGES_QUERY = gql`
  query Pages($locale: String, $preview: Boolean = false, $limit: Int = 100) {
    pageCollection(
      limit: $limit
      order: [title_ASC]
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

export type PagesQueryVariables = {
  locale?: string;
  preview?: boolean;
  limit?: number;
};
