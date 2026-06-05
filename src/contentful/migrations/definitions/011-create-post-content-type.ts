import type { MigrationFunction } from "contentful-migration";

export const up: MigrationFunction = (migration) => {
  const post = migration
    .createContentType("post")
    .name("Post")
    .description("Blog/article post with featured image and rich text content");

  post
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true)
    .validations([{ size: { max: 255 } }]);

  post
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }]);

  post
    .createField("categories")
    .name("Categories")
    .type("Array")
    .items({
      type: "Symbol",
    });

  post.createField("author").name("Author").type("Symbol");

  post
    .createField("featuredImage")
    .name("Featured Image")
    .type("Link")
    .linkType("Asset")
    .required(true)
    .validations([{ linkMimetypeGroup: ["image"] }]);

  post
    .createField("content")
    .name("Content")
    .type("RichText")
    .required(true);

  post
    .createField("seo")
    .name("SEO")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["pageSeo"] }]);

  post.displayField("title");
};

export const down: MigrationFunction = (migration) => {
  migration.deleteContentType("post");
};
