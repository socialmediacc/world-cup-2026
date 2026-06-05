import type { Document } from "@contentful/rich-text-types";

import type {
  ContentfulAsset,
  PageSeoEntry,
  PostEntry,
} from "@/contentful/types/graphql";

export type Post = {
  title: string;
  slug: string;
  categories: string[];
  author?: string;
  featuredImage: {
    url: string;
    alt?: string;
  };
  content: Document;
  embeddedAssets: Record<string, ContentfulAsset>;
  seo?: PageSeoEntry | null;
};

function mapEmbeddedAssets(
  content: PostEntry["content"],
): Record<string, ContentfulAsset> {
  const assets: Record<string, ContentfulAsset> = {};

  for (const asset of content?.links?.assets?.block ?? []) {
    if (asset?.sys?.id) {
      assets[asset.sys.id] = asset;
    }
  }

  return assets;
}

export function mapPostEntry(entry: PostEntry | null | undefined): Post | null {
  if (!entry?.title || !entry.slug || !entry.featuredImage?.url || !entry.content?.json) {
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
    content: entry.content.json as Document,
    embeddedAssets: mapEmbeddedAssets(entry.content),
    seo: entry.seo,
  };
}
