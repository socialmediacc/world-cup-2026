import { getMigrationConfig } from "@/contentful/config";

type ContentfulErrorBody = {
  message?: string;
  sys?: { id?: string };
};

async function fetchContentful(
  path: string,
  accessToken: string,
): Promise<{ ok: boolean; status: number; body: ContentfulErrorBody | null }> {
  const response = await fetch(`https://api.contentful.com${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  let body: ContentfulErrorBody | null = null;
  try {
    body = (await response.json()) as ContentfulErrorBody;
  } catch {
    body = null;
  }

  return { ok: response.ok, status: response.status, body };
}

function formatManagementAccessError(
  status: number,
  body: ContentfulErrorBody | null,
  spaceId: string,
): string {
  const errorId = body?.sys?.id;

  if (status === 401 && errorId === "OrganizationAccessGrantRequired") {
    return [
      "Contentful management token is valid but not authorized for your organization.",
      "",
      "Authorize it in the Contentful web app:",
      "  1. Open your space → Settings → CMA tokens",
      "  2. Find your Personal Access Token in the list",
      '  3. Click "Authorize" next to your organization (complete SSO if prompted)',
      "  4. Re-run: pnpm contentful:migrate",
      "",
      `Space ID: ${spaceId}`,
    ].join("\n");
  }

  if (status === 401) {
    return [
      "Contentful management token was rejected (401 Unauthorized).",
      "",
      "Check CONTENTFUL_MANAGEMENT_ACCESS_TOKEN in .env.local:",
      "  - Use a Personal Access Token (starts with CFPAT-), not delivery/preview keys",
      "  - Copy the full token with no quotes or trailing spaces",
      "  - Create a new token if the current one was revoked or expired",
    ].join("\n");
  }

  if (status === 404) {
    return [
      "Contentful space not found or management token cannot access it.",
      "",
      `Verify CONTENTFUL_SPACE_ID=${spaceId} matches Settings → General settings in Contentful.`,
    ].join("\n");
  }

  const message = body?.message ?? "Unknown error";
  return `Contentful management API check failed (HTTP ${status}): ${message}`;
}

/** Validates PAT access to the configured space before running migrations. */
export async function verifyManagementAccess(): Promise<void> {
  const { spaceId, managementAccessToken } = getMigrationConfig();

  const userCheck = await fetchContentful("/users/me", managementAccessToken);
  if (!userCheck.ok) {
    throw new Error(formatManagementAccessError(userCheck.status, userCheck.body, spaceId));
  }

  const spaceCheck = await fetchContentful(
    `/spaces/${spaceId}`,
    managementAccessToken,
  );
  if (!spaceCheck.ok) {
    throw new Error(formatManagementAccessError(spaceCheck.status, spaceCheck.body, spaceId));
  }
}
