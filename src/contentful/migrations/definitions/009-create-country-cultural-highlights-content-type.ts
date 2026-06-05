import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const culturalHighlights = migration
    .createContentType("countryCulturalHighlights")
    .name("Country Cultural Highlights")
    .description("Cultural highlights card for Country Profile pages");

  culturalHighlights
    .createField("internalName")
    .name("Internal name")
    .type("Symbol")
    .required(true);

  culturalHighlights
    .createField("description")
    .name("Description")
    .type("Text")
    .required(true);

  culturalHighlights
    .createField("tags")
    .name("Tags")
    .type("Array")
    .items({
      type: "Symbol",
    });

  culturalHighlights.displayField("internalName");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("countryCulturalHighlights");
};
