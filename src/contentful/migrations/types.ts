import type { MigrationFunction } from "contentful-migration";

export type ContentfulMigration = {
  /** Stable id, e.g. `001-create-country-hero-content-type` */
  id: string;
  description: string;
  up: MigrationFunction;
  down?: MigrationFunction;
};
