import type { PostListEntry } from "@/contentful/types/graphql";
import { extractExcerpt } from "@/contentful/utils/extract-excerpt";

export type PostSummary = {
  title: string;
  slug: string;
  categories: string[];
  author?: string;
  featuredImage: {
    url: string;
    alt?: string;
  };
  excerpt: string;
  publishedAt?: string;
};

export function mapPostSummaryEntry(
  entry: PostListEntry | null | undefined,
): PostSummary | null {
  if (!entry?.title || !entry.slug || !entry.featuredImage?.url) {
    return null;
  }

  const categories =
    entry.categories?.filter(
      (category): category is string =>
        category != null && category.trim() !== "",
    ) ?? [];

  return {
    title: entry.title,
    slug: entry.slug,
    categories,
    author: entry.author ?? undefined,
    featuredImage: {
      url: entry.featuredImage.url,
      alt:
        entry.featuredImage.description ??
        entry.featuredImage.title ??
        entry.title,
    },
    excerpt: extractExcerpt(entry.content?.json),
    publishedAt:
      entry.sys?.firstPublishedAt ?? entry.sys?.publishedAt ?? undefined,
  };
}
