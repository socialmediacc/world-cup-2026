import { gql } from "@apollo/client";

import { HOME_PAGE_FIELDS } from "@/contentful/graphql/fragments/home-page";

export const HOME_BY_SLUG_QUERY = gql`
  query HomeBySlug($slug: String!, $locale: String, $preview: Boolean = false) {
    homePageCollection(
      limit: 1
      where: { slug: $slug }
      locale: $locale
      preview: $preview
    ) {
      items {
        ...HomePageFields
      }
    }
  }
  ${HOME_PAGE_FIELDS}
`;

export type HomeBySlugQueryVariables = {
  slug: string;
  locale?: string;
  preview?: boolean;
};
