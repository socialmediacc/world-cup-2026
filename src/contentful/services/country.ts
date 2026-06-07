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
import {
  HOMEPAGE_COUNTRIES_QUERY,
  type HomepageCountriesQueryVariables,
} from "@/contentful/graphql/queries/homepage-countries";
import type {
  CountriesQuery,
  CountryBySlugQuery,
  HomepageCountriesQuery,
} from "@/contentful/types/graphql";
import {
  mapHomepageCountryEntry,
  type HomepageCountry,
} from "@/contentful/utils/map-homepage-country";

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

export async function getHomepageCountries(
  variables: HomepageCountriesQueryVariables = {},
  options: FetchOptions = {},
): Promise<HomepageCountry[]> {
  if (!isContentfulConfigured()) {
    return [];
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<HomepageCountriesQuery>({
    query: HOMEPAGE_COUNTRIES_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return (data?.countryProfileCollection?.items ?? [])
    .map((entry) => mapHomepageCountryEntry(entry))
    .filter((country): country is HomepageCountry => country != null);
}

export type { HomepageCountry };
