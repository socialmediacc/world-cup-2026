import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const countryProfile = migration.editContentType("countryProfile");

  countryProfile
    .createField("fastFacts")
    .name("Fast Facts")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["fastFactItem"] }],
    });

  countryProfile
    .createField("culturalHighlights")
    .name("Cultural Highlights")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["countryCulturalHighlights"] }]);

  countryProfile.moveField("fastFacts").afterField("hero");
  countryProfile.moveField("culturalHighlights").afterField("fastFacts");
};

export const down: MigrationFunction = (migration) => {
  const countryProfile = migration.editContentType("countryProfile");

  countryProfile.deleteField("culturalHighlights");
  countryProfile.deleteField("fastFacts");
};
