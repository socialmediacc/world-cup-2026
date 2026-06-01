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
export { fetchPageBySlug, fetchPages } from "@/contentful/services/page";
export { buildPageMetadata } from "@/contentful/utils/build-page-metadata";
