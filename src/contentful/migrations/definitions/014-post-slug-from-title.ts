import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const post = migration.editContentType("post");

  post.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "title",
  });
};

export const down: MigrationFunction = (migration) => {
  const post = migration.editContentType("post");

  post.resetFieldControl("slug");
};
