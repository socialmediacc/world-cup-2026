import { query, previewQuery } from "@/contentful/apollo/client";
import { isContentfulConfigured } from "@/contentful/config";
import {
  PAGE_BY_SLUG_QUERY,
  type PageBySlugQueryVariables,
} from "@/contentful/graphql/queries/page-by-slug";
import {
  PAGES_QUERY,
  type PagesQueryVariables,
} from "@/contentful/graphql/queries/pages";
import type {
  PageBySlugQuery,
  PagesQuery,
} from "@/contentful/types/graphql";

type FetchOptions = {
  preview?: boolean;
};

export async function fetchPageBySlug(
  variables: PageBySlugQueryVariables,
  options: FetchOptions = {},
) {
  if (!isContentfulConfigured()) {
    return null;
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<PageBySlugQuery>({
    query: PAGE_BY_SLUG_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return data?.pageCollection?.items?.[0] ?? null;
}

export async function fetchPages(
  variables: PagesQueryVariables = {},
  options: FetchOptions = {},
) {
  if (!isContentfulConfigured()) {
    return [];
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<PagesQuery>({
    query: PAGES_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return data?.pageCollection?.items ?? [];
}
