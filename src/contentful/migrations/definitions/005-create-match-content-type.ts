import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const match = migration
    .createContentType("match")
    .name("Match")
    .description("World Cup 2026 fixture");

  match
    .createField("internalName")
    .name("Internal name")
    .type("Symbol")
    .required(true);

  match
    .createField("kickoff")
    .name("Kickoff")
    .type("Date")
    .required(true);

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

  match
    .createField("venue")
    .name("Venue")
    .type("Symbol")
    .required(true);

  match
    .createField("ticketUrl")
    .name("Ticket URL")
    .type("Symbol")
    .validations([
      {
        regexp: {
          pattern:
            "^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$",
        },
      },
    ]);

  match.displayField("internalName");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("match");
};
