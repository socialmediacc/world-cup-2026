import { query, previewQuery } from "@/contentful/apollo/client";
import { isContentfulConfigured } from "@/contentful/config";
import {
  HOME_BY_SLUG_QUERY,
  type HomeBySlugQueryVariables,
} from "@/contentful/graphql/queries/home-by-slug";
import type { HomeBySlugQuery } from "@/contentful/types/graphql";
import { mapHomePageEntry, type HomePage } from "@/contentful/utils/map-home";

type FetchOptions = {
  preview?: boolean;
};

export async function fetchHomePageBySlug(
  variables: HomeBySlugQueryVariables,
  options: FetchOptions = {},
): Promise<HomePage | null> {
  if (!isContentfulConfigured()) {
    return null;
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<HomeBySlugQuery>({
    query: HOME_BY_SLUG_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return mapHomePageEntry(data?.homePageCollection?.items?.[0] ?? null);
}

export type { HomePage, HomeHero } from "@/contentful/utils/map-home";
