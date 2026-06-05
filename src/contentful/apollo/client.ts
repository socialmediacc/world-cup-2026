import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

import {
  getContentfulConfig,
  getContentfulGraphqlEndpoint,
  isContentfulConfigured,
} from "@/contentful/config";

export type ContentfulApolloOptions = {
  preview?: boolean;
};

function createContentfulLink(options: ContentfulApolloOptions = {}) {
  const { preview = false } = options;
  const config = getContentfulConfig();
  const accessToken =
    preview && config.previewAccessToken
      ? config.previewAccessToken
      : config.deliveryAccessToken;

  return new HttpLink({
    uri: config.graphqlEndpoint,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    fetchOptions: {
      next: {
        revalidate:
          preview || process.env.NODE_ENV === "development" ? 0 : 60,
      },
    },
  });
}

function createApolloClient(options: ContentfulApolloOptions = {}) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createContentfulLink(options),
  });
}

/** Default delivery API client for React Server Components (per-request singleton). */
export const { getClient, query, PreloadQuery } = registerApolloClient(() =>
  createApolloClient(),
);

/** Preview API client when draft content is required. */
export const {
  getClient: getPreviewClient,
  query: previewQuery,
  PreloadQuery: PreviewPreloadQuery,
} = registerApolloClient(() => createApolloClient({ preview: true }));

/**
 * Build a one-off client (e.g. scripts or non-RSC contexts).
 * Prefer `query` / `getClient` in Server Components.
 */
export function createContentfulApolloClient(
  options: ContentfulApolloOptions = {},
) {
  if (!isContentfulConfigured()) {
    throw new Error(
      "Contentful is not configured. Set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_ACCESS_TOKEN.",
    );
  }
  return createApolloClient(options);
}

export { getContentfulGraphqlEndpoint };
