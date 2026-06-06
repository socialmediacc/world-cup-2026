import type { PageSeoEntry, HomePageEntry } from "@/contentful/types/graphql";

export type HomeHero = {
  title: string;
  description: string;
  heroImage: {
    url: string;
    alt?: string;
  };
};

export type HomePage = {
  slug: string;
  hero: HomeHero;
  seo?: PageSeoEntry | null;
};

function mapHomeHero(hero: HomePageEntry["hero"]): HomeHero | null {
  if (!hero?.title || !hero.description || !hero.heroImage?.url) {
    return null;
  }

  return {
    title: hero.title,
    description: hero.description,
    heroImage: {
      url: hero.heroImage.url,
      alt:
        hero.heroImage.description ??
        hero.heroImage.title ??
        hero.title,
    },
  };
}

export function mapHomePageEntry(
  entry: HomePageEntry | null | undefined,
): HomePage | null {
  if (!entry?.slug) {
    return null;
  }

  const hero = mapHomeHero(entry.hero);

  if (!hero) {
    return null;
  }

  return {
    slug: entry.slug,
    hero,
    seo: entry.seo,
  };
}
