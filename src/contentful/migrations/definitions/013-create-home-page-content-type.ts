import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const homePage = migration
    .createContentType("homePage")
    .name("Home Page")
    .description("Home page with hero and SEO metadata");

  homePage
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }]);

  homePage
    .createField("hero")
    .name("Hero")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["homeHero"] }]);

  homePage
    .createField("seo")
    .name("SEO")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["pageSeo"] }]);

  homePage.displayField("slug");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("homePage");
};
