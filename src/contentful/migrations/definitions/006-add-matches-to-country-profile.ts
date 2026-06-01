import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const countryProfile = migration.editContentType("countryProfile");

  countryProfile
    .createField("flag")
    .name("Flag")
    .type("Link")
    .linkType("Asset")
    .validations([
      {
        linkMimetypeGroup: ["image"],
      },
    ]);

  countryProfile
    .createField("matches")
    .name("Matches")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["match"] }],
    });

  countryProfile.moveField("flag").afterField("slug");
  countryProfile.moveField("matches").afterField("hero");
};

export const down: MigrationFunction = (migration) => {
  const countryProfile = migration.editContentType("countryProfile");

  countryProfile.deleteField("matches");
  countryProfile.deleteField("flag");
};
