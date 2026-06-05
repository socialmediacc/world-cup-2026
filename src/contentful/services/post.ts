import { query, previewQuery } from "@/contentful/apollo/client";
import { isContentfulConfigured } from "@/contentful/config";
import {
  POST_BY_SLUG_QUERY,
  type PostBySlugQueryVariables,
} from "@/contentful/graphql/queries/post-by-slug";
import {
  POST_SLUGS_QUERY,
  type PostSlugsQueryVariables,
} from "@/contentful/graphql/queries/post-slugs";
import type { PostBySlugQuery, PostSlugsQuery } from "@/contentful/types/graphql";
import { mapPostEntry, type Post } from "@/contentful/utils/map-post";

type FetchOptions = {
  preview?: boolean;
};

export async function fetchPostBySlug(
  variables: PostBySlugQueryVariables,
  options: FetchOptions = {},
): Promise<Post | null> {
  if (!isContentfulConfigured()) {
    return null;
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<PostBySlugQuery>({
    query: POST_BY_SLUG_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return mapPostEntry(data?.postCollection?.items?.[0] ?? null);
}

export async function fetchPostSlugs(
  variables: PostSlugsQueryVariables = {},
  options: FetchOptions = {},
): Promise<string[]> {
  if (!isContentfulConfigured()) {
    return [];
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<PostSlugsQuery>({
    query: POST_SLUGS_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return (data?.postCollection?.items ?? [])
    .map((item) => item?.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export type { Post };
