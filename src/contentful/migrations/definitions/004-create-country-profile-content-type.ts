import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const countryProfile = migration
    .createContentType("countryProfile")
    .name("Country Profile")
    .description("World Cup 2026 country profile page");

  countryProfile
    .createField("name")
    .name("Name")
    .type("Symbol")
    .required(true);

  countryProfile
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }]);

  countryProfile
    .createField("hero")
    .name("Hero")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["countryHero"] }]);

  countryProfile
    .createField("seo")
    .name("SEO")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["pageSeo"] }]);

  countryProfile.displayField("name");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("countryProfile");
};
