import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const countryHero = migration
    .createContentType("countryHero")
    .name("Country Hero")
    .description("Hero banner for Country Profile pages (World Cup 2026)");

  countryHero
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  countryHero
    .createField("description")
    .name("Description")
    .type("Text")
    .required(true);

  countryHero
    .createField("backgroundImage")
    .name("Background image")
    .type("Link")
    .linkType("Asset")
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ["image"],
      },
    ]);

  countryHero.displayField("title");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("countryHero");
};
