export {
  getContentfulConfig,
  getContentfulGraphqlEndpoint,
  getMigrationConfig,
  isContentfulConfigured,
  type ContentfulConfig,
} from "@/contentful/config";

export {
  createContentfulApolloClient,
  getClient,
  getPreviewClient,
  PreloadQuery,
  PreviewPreloadQuery,
  previewQuery,
  query,
} from "@/contentful/apollo/client";

export * from "@/contentful/graphql";
export {
  fetchCountries,
  fetchCountryBySlug,
} from "@/contentful/services/country";
export {
  fetchHomePageBySlug,
  type HomeHero,
  type HomePage,
} from "@/contentful/services/home";
export { fetchPageBySlug, fetchPages } from "@/contentful/services/page";
export {
  fetchPostBySlug,
  fetchPosts,
  fetchPostSlugs,
  getPostsCount,
  POSTS_PAGE_SIZE,
  type Post,
  type PostSummary,
} from "@/contentful/services/post";
export { buildPageMetadata } from "@/contentful/utils/build-page-metadata";
export { HOME_PAGE_SLUG } from "@/contentful/constants/home";
