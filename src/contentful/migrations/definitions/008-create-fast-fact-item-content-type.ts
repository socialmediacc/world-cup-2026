import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const fastFactItem = migration
    .createContentType("fastFactItem")
    .name("Fast Fact Item")
    .description("Single row in a country profile Fast Facts section");

  fastFactItem
    .createField("internalName")
    .name("Internal name")
    .type("Symbol")
    .required(true);

  fastFactItem
    .createField("label")
    .name("Label")
    .type("Symbol")
    .required(true);

  fastFactItem
    .createField("value")
    .name("Value")
    .type("Symbol")
    .required(true);

  fastFactItem
    .createField("icon")
    .name("Icon")
    .type("Symbol")
    .required(true);

  fastFactItem.displayField("internalName");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("fastFactItem");
};
