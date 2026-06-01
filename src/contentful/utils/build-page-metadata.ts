import type { Metadata } from "next";

import type { PageEntry, PageSeoEntry } from "@/contentful/types/graphql";

type SeoMetadataSource = {
  title?: PageEntry["title"];
  seo?: PageSeoEntry | null;
};

export function buildPageMetadata(page: SeoMetadataSource): Metadata {
  const seo = page.seo;

  if (!seo) {
    return {
      title: page.title ?? undefined,
    };
  }

  const title = seo.metaTitle ?? page.title ?? undefined;
  const description = seo.metaDescription ?? undefined;
  const openGraphTitle = seo.ogTitle ?? title;
  const openGraphDescription = seo.ogDescription ?? description;
  const ogImage = seo.ogImage?.url
    ? [
        {
          url: seo.ogImage.url,
          width: seo.ogImage.width ?? undefined,
          height: seo.ogImage.height ?? undefined,
          alt: seo.ogImage.title ?? undefined,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: seo.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    robots: seo.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      images: ogImage,
    },
    twitter: {
      card:
        (seo.twitterCard as "summary" | "summary_large_image" | null) ??
        "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: seo.ogImage?.url ? [seo.ogImage.url] : undefined,
    },
  };
}
