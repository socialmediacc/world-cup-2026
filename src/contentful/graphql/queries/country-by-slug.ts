import { gql } from "@apollo/client";

import { COUNTRY_PROFILE_FIELDS } from "@/contentful/graphql/fragments/country-profile";

export const COUNTRY_BY_SLUG_QUERY = gql`
  query CountryBySlug(
    $slug: String!
    $locale: String
    $preview: Boolean = false
  ) {
    countryProfileCollection(
      limit: 1
      where: { slug: $slug }
      locale: $locale
      preview: $preview
    ) {
      items {
        ...CountryProfileFields
      }
    }
  }
  ${COUNTRY_PROFILE_FIELDS}
`;

export type CountryBySlugQueryVariables = {
  slug: string;
  locale?: string;
  preview?: boolean;
};
