import { gql } from "@apollo/client";

import { COUNTRY_PROFILE_FIELDS } from "@/contentful/graphql/fragments/country-profile";

export const COUNTRIES_QUERY = gql`
  query Countries(
    $locale: String
    $preview: Boolean = false
    $limit: Int = 100
  ) {
    countryProfileCollection(
      limit: $limit
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

export type CountriesQueryVariables = {
  locale?: string;
  preview?: boolean;
  limit?: number;
};
