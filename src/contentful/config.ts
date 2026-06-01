/**
 * Contentful environment configuration.
 * Values are read at runtime so builds succeed without CMS credentials.
 */

export type ContentfulConfig = {
  spaceId: string;
  environment: string;
  deliveryAccessToken: string;
  previewAccessToken?: string;
  managementAccessToken?: string;
  graphqlEndpoint: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. See .env.example.`,
    );
  }
  return value;
}

export function getContentfulGraphqlEndpoint(
  spaceId: string,
  environment: string,
): string {
  return `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`;
}

export function getContentfulConfig(): ContentfulConfig {
  const spaceId = requireEnv("CONTENTFUL_SPACE_ID");
  const environment =
    process.env.CONTENTFUL_ENVIRONMENT ?? process.env.CONTENTFUL_ENV ?? "master";
  const deliveryAccessToken = requireEnv("CONTENTFUL_DELIVERY_ACCESS_TOKEN");

  return {
    spaceId,
    environment,
    deliveryAccessToken,
    previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    managementAccessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    graphqlEndpoint: getContentfulGraphqlEndpoint(spaceId, environment),
  };
}

export function isContentfulConfigured(): boolean {
  return Boolean(
    process.env.CONTENTFUL_SPACE_ID &&
      process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  );
}

export function getMigrationConfig(): {
  spaceId: string;
  environment: string;
  managementAccessToken: string;
} {
  const spaceId = requireEnv("CONTENTFUL_SPACE_ID");
  const environment =
    process.env.CONTENTFUL_ENVIRONMENT ?? process.env.CONTENTFUL_ENV ?? "master";
  const managementAccessToken = requireEnv(
    "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN",
  );

  return { spaceId, environment, managementAccessToken };
}
