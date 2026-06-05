/** Hand-written types until GraphQL Code Generator is added. */

export type ContentfulRichText = {
  json: unknown;
};

export type ContentfulAsset = {
  sys: {
    id: string;
  };
  title?: string | null;
  description?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  contentType?: string | null;
};

export type PageSeoEntry = {
  internalName?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  twitterCard?: string | null;
  ogImage?: ContentfulAsset | null;
};

export type CountryHeroEntry = {
  title?: string | null;
  description?: string | null;
  backgroundImage?: ContentfulAsset | null;
};

export type FastFactItemEntry = {
  sys: {
    id: string;
    publishedAt?: string | null;
    firstPublishedAt?: string | null;
  };
  internalName?: string | null;
  label?: string | null;
  value?: string | null;
  icon?: string | null;
};

export type CountryCulturalHighlightsEntry = {
  sys: {
    id: string;
    publishedAt?: string | null;
    firstPublishedAt?: string | null;
  };
  internalName?: string | null;
  description?: string | null;
  tags?: Array<string | null> | null;
};

export type MatchEntry = {
  sys: {
    id: string;
    publishedAt?: string | null;
    firstPublishedAt?: string | null;
  };
  internalName?: string | null;
  kickoff?: string | null;
  venue?: string | null;
  ticketUrl?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
};

export type CountryProfileEntry = {
  sys: {
    id: string;
    publishedAt?: string | null;
    firstPublishedAt?: string | null;
  };
  name?: string | null;
  slug?: string | null;
  flag?: ContentfulAsset | null;
  hero?: CountryHeroEntry | null;
  fastFactsCollection?: {
    items?: Array<FastFactItemEntry | null> | null;
  } | null;
  culturalHighlights?: CountryCulturalHighlightsEntry | null;
  matchesCollection?: {
    items?: Array<MatchEntry | null> | null;
  } | null;
  seo?: PageSeoEntry | null;
};

export type PageEntry = {
  sys: {
    id: string;
    publishedAt?: string | null;
    firstPublishedAt?: string | null;
  };
  title?: string | null;
  slug?: string | null;
  body?: ContentfulRichText | null;
  seo?: PageSeoEntry | null;
};

export type PageBySlugQuery = {
  pageCollection?: {
    items?: Array<PageEntry | null> | null;
  } | null;
};

export type PagesQuery = {
  pageCollection?: {
    items?: Array<PageEntry | null> | null;
  } | null;
};

export type CountryBySlugQuery = {
  countryProfileCollection?: {
    items?: Array<CountryProfileEntry | null> | null;
  } | null;
};

export type CountriesQuery = {
  countryProfileCollection?: {
    items?: Array<CountryProfileEntry | null> | null;
  } | null;
};
