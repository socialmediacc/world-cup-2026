import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const pageSeo = migration
    .createContentType("pageSeo")
    .name("Page SEO")
    .description(
      "Fundamental SEO metadata for pages (title, description, OG, robots)",
    );

  pageSeo
    .createField("internalName")
    .name("Internal name")
    .type("Symbol")
    .required(true);

  pageSeo
    .createField("metaTitle")
    .name("Meta title")
    .type("Symbol")
    .required(true)
    .validations([{ size: { max: 60 } }]);

  pageSeo
    .createField("metaDescription")
    .name("Meta description")
    .type("Text")
    .required(true)
    .validations([{ size: { max: 160 } }]);

  pageSeo
    .createField("ogImage")
    .name("OG image")
    .type("Link")
    .linkType("Asset")
    .validations([
      {
        linkMimetypeGroup: ["image"],
      },
    ]);

  pageSeo
    .createField("canonicalUrl")
    .name("Canonical URL")
    .type("Symbol");

  pageSeo
    .createField("noIndex")
    .name("No index")
    .type("Boolean")
    .defaultValue({ "en-US": false });

  pageSeo
    .createField("ogTitle")
    .name("OG title override")
    .type("Symbol");

  pageSeo
    .createField("ogDescription")
    .name("OG description override")
    .type("Text");

  pageSeo
    .createField("twitterCard")
    .name("Twitter card type")
    .type("Symbol")
    .validations([{ in: ["summary", "summary_large_image"] }]);

  pageSeo.displayField("internalName");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("pageSeo");
};
