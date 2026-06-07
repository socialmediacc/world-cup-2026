import { gql } from "@apollo/client";

import { COUNTRY_LIST_FIELDS } from "@/contentful/graphql/fragments/country-list";

export const HOMEPAGE_COUNTRIES_QUERY = gql`
  query HomepageCountries(
    $locale: String
    $preview: Boolean = false
    $limit: Int = 100
  ) {
    countryProfileCollection(
      limit: $limit
      order: [name_ASC]
      locale: $locale
      preview: $preview
    ) {
      items {
        ...CountryListFields
      }
    }
  }
  ${COUNTRY_LIST_FIELDS}
`;

export type HomepageCountriesQueryVariables = {
  locale?: string;
  preview?: boolean;
  limit?: number;
};
