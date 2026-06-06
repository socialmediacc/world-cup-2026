import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const homeHero = migration
    .createContentType("homeHero")
    .name("Home Hero")
    .description("Hero section for the Home page");

  homeHero
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  homeHero
    .createField("description")
    .name("Description")
    .type("Text")
    .required(true);

  homeHero
    .createField("heroImage")
    .name("Hero Image")
    .type("Link")
    .linkType("Asset")
    .required(true)
    .validations([{ linkMimetypeGroup: ["image"] }]);

  homeHero.displayField("title");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("homeHero");
};
