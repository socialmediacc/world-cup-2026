import { query, previewQuery } from "@/contentful/apollo/client";
import { isContentfulConfigured } from "@/contentful/config";
import {
  COUNTRIES_QUERY,
  type CountriesQueryVariables,
} from "@/contentful/graphql/queries/countries";
import {
  COUNTRY_BY_SLUG_QUERY,
  type CountryBySlugQueryVariables,
} from "@/contentful/graphql/queries/country-by-slug";
import type {
  CountriesQuery,
  CountryBySlugQuery,
} from "@/contentful/types/graphql";

type FetchOptions = {
  preview?: boolean;
};

export async function fetchCountryBySlug(
  variables: CountryBySlugQueryVariables,
  options: FetchOptions = {},
) {
  if (!isContentfulConfigured()) {
    return null;
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<CountryBySlugQuery>({
    query: COUNTRY_BY_SLUG_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return data?.countryProfileCollection?.items?.[0] ?? null;
}

export async function fetchCountries(
  variables: CountriesQueryVariables = {},
  options: FetchOptions = {},
) {
  if (!isContentfulConfigured()) {
    return [];
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<CountriesQuery>({
    query: COUNTRIES_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return data?.countryProfileCollection?.items ?? [];
}
