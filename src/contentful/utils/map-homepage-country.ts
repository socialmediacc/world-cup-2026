import type { HomepageCountryEntry } from "@/contentful/types/graphql";

export type HomepageCountry = {
  name: string;
  slug: string;
  flag: {
    url: string;
    alt?: string;
  };
};

export function mapHomepageCountryEntry(
  entry: HomepageCountryEntry | null | undefined,
): HomepageCountry | null {
  if (!entry?.name || !entry.slug || !entry.flag?.url) {
    return null;
  }

  return {
    name: entry.name,
    slug: entry.slug,
    flag: {
      url: entry.flag.url,
      alt:
        entry.flag.description ??
        entry.flag.title ??
        `${entry.name} flag`,
    },
  };
}
