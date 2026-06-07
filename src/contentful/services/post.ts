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
import {
  POSTS_COUNT_QUERY,
  type PostsCountQueryVariables,
} from "@/contentful/graphql/queries/posts-count";
import {
  POSTS_QUERY,
  type PostsQueryVariables,
} from "@/contentful/graphql/queries/posts";
import type {
  PostBySlugQuery,
  PostSlugsQuery,
  PostsCountQuery,
  PostsQuery,
} from "@/contentful/types/graphql";
import { mapPostEntry, type Post } from "@/contentful/utils/map-post";
import {
  mapPostSummaryEntry,
  type PostSummary,
} from "@/contentful/utils/map-post-summary";

type FetchOptions = {
  preview?: boolean;
};

export const POSTS_PAGE_SIZE = 10;

type FetchPostsParams = {
  page?: number;
  limit?: number;
  locale?: string;
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

export async function fetchPosts(
  { page = 1, limit = POSTS_PAGE_SIZE, locale }: FetchPostsParams = {},
  options: FetchOptions = {},
): Promise<{ items: PostSummary[]; total: number }> {
  if (!isContentfulConfigured()) {
    return { items: [], total: 0 };
  }

  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * limit;

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<PostsQuery>({
    query: POSTS_QUERY,
    variables: {
      preview: options.preview,
      locale,
      limit,
      skip,
    } satisfies PostsQueryVariables,
  });

  const items = (data?.postCollection?.items ?? [])
    .map((entry) => mapPostSummaryEntry(entry))
    .filter((post): post is PostSummary => post != null);

  return {
    items,
    total: data?.postCollection?.total ?? 0,
  };
}

export async function getPostsCount(
  variables: PostsCountQueryVariables = {},
  options: FetchOptions = {},
): Promise<number> {
  if (!isContentfulConfigured()) {
    return 0;
  }

  const runQuery = options.preview ? previewQuery : query;
  const { data } = await runQuery<PostsCountQuery>({
    query: POSTS_COUNT_QUERY,
    variables: { preview: options.preview, ...variables },
  });

  return data?.postCollection?.total ?? 0;
}

export type { Post, PostSummary };
