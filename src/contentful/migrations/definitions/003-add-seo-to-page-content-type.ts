import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const page = migration
    .createContentType("page")
    .name("Page")
    .description("CMS page with slug, body, and SEO metadata");

  page
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  page
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }]);

  page
    .createField("body")
    .name("Body")
    .type("RichText");

  page
    .createField("seo")
    .name("SEO")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["pageSeo"] }]);

  page.displayField("title");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("page");
};
