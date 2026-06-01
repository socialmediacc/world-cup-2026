import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const match = migration.editContentType("match");

  match.deleteField("homeTeam");
  match.deleteField("awayTeam");

  match
    .createField("homeTeam")
    .name("Home team")
    .type("Symbol")
    .required(true);

  match
    .createField("awayTeam")
    .name("Away team")
    .type("Symbol")
    .required(true);
};

export const down: MigrationFunction = (migration) => {
  const match = migration.editContentType("match");

  match.deleteField("homeTeam");
  match.deleteField("awayTeam");

  match
    .createField("homeTeam")
    .name("Home team")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["countryProfile"] }]);

  match
    .createField("awayTeam")
    .name("Away team")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["countryProfile"] }]);
};
