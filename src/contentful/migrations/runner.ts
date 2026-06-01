import { runMigration } from "contentful-migration";

import { getMigrationConfig } from "@/contentful/config";
import { contentfulMigrations } from "@/contentful/migrations/registry";
import type { ContentfulMigration } from "@/contentful/migrations/types";
import { verifyManagementAccess } from "@/contentful/verify-management-access";

export type RunMigrationsOptions = {
  /** Run only migrations whose ids are in this list. */
  only?: string[];
  /** Run `down` instead of `up` for matched migrations (reverse order). */
  direction?: "up" | "down";
  /** Skip interactive confirmation (always true in CI). */
  yes?: boolean;
};

function resolveMigrations(only?: string[]): ContentfulMigration[] {
  if (!only?.length) {
    return contentfulMigrations;
  }

  const selected = new Set(only);
  const resolved = contentfulMigrations.filter((m) => selected.has(m.id));

  const missing = only.filter((id) => !resolved.some((m) => m.id === id));
  if (missing.length > 0) {
    throw new Error(`Unknown migration id(s): ${missing.join(", ")}`);
  }

  return resolved;
}

async function runSingleMigration(
  migration: ContentfulMigration,
  direction: "up" | "down",
  yes: boolean,
): Promise<void> {
  const { spaceId, environment, managementAccessToken } = getMigrationConfig();
  const migrationFunction =
    direction === "up" ? migration.up : migration.down;

  if (!migrationFunction) {
    throw new Error(
      `Migration "${migration.id}" has no \`${direction}\` function.`,
    );
  }

  console.log(`→ [${direction}] ${migration.id}: ${migration.description}`);

  await runMigration({
    spaceId,
    environmentId: environment,
    accessToken: managementAccessToken,
    yes,
    retryLimit: 5,
    requestBatchSize: 100,
    migrationFunction,
  });
}

export async function runContentfulMigrations(
  options: RunMigrationsOptions = {},
): Promise<void> {
  const { only, direction = "up", yes = true } = options;
  const migrations = resolveMigrations(only);
  const ordered =
    direction === "down" ? [...migrations].reverse() : migrations;

  if (ordered.length === 0) {
    console.log("No migrations to run.");
    return;
  }

  await verifyManagementAccess();

  for (const migration of ordered) {
    await runSingleMigration(migration, direction, yes);
  }

  console.log(
    `Completed ${ordered.length} migration(s) (${direction}).`,
  );
}
