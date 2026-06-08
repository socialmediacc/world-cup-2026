import type { ContentfulMigration } from "@/contentful/migrations/types";
import {
  down as down001,
  up as up001,
} from "@/contentful/migrations/definitions/001-create-country-hero-content-type";
import {
  down as down002,
  up as up002,
} from "@/contentful/migrations/definitions/002-create-page-seo-content-type";
import {
  down as down003,
  up as up003,
} from "@/contentful/migrations/definitions/003-add-seo-to-page-content-type";
import {
  down as down004,
  up as up004,
} from "@/contentful/migrations/definitions/004-create-country-profile-content-type";
import {
  down as down005,
  up as up005,
} from "@/contentful/migrations/definitions/005-create-match-content-type";
import {
  down as down006,
  up as up006,
} from "@/contentful/migrations/definitions/006-add-matches-to-country-profile";
import {
  down as down007,
  up as up007,
} from "@/contentful/migrations/definitions/007-match-teams-as-strings";
import {
  down as down008,
  up as up008,
} from "@/contentful/migrations/definitions/008-create-fast-fact-item-content-type";
import {
  down as down009,
  up as up009,
} from "@/contentful/migrations/definitions/009-create-country-cultural-highlights-content-type";
import {
  down as down010,
  up as up010,
} from "@/contentful/migrations/definitions/010-add-facts-and-highlights-to-country-profile";
import {
  down as down011,
  up as up011,
} from "@/contentful/migrations/definitions/011-create-post-content-type";
import {
  down as down012,
  up as up012,
} from "@/contentful/migrations/definitions/012-create-home-hero-content-type";
import {
  down as down013,
  up as up013,
} from "@/contentful/migrations/definitions/013-create-home-page-content-type";
import {
  down as down014,
  up as up014,
} from "@/contentful/migrations/definitions/014-post-slug-from-title";

/**
 * Ordered list of Contentful migrations. Add new files under
 * `migrations/definitions/` and register them here.
 */
export const contentfulMigrations: ContentfulMigration[] = [
  {
    id: "001-create-country-hero-content-type",
    description:
      "Create Country Hero content type (title, description, backgroundImage)",
    up: up001,
    down: down001,
  },
  {
    id: "002-create-page-seo-content-type",
    description:
      "Create Page SEO content type (meta title, description, OG, robots)",
    up: up002,
    down: down002,
  },
  {
    id: "003-add-seo-to-page-content-type",
    description:
      "Create Page content type (title, slug, body, SEO reference)",
    up: up003,
    down: down003,
  },
  {
    id: "004-create-country-profile-content-type",
    description:
      "Create Country Profile content type (name, slug, hero, SEO)",
    up: up004,
    down: down004,
  },
  {
    id: "005-create-match-content-type",
    description:
      "Create Match content type (kickoff, teams, venue, ticket URL)",
    up: up005,
    down: down005,
  },
  {
    id: "006-add-matches-to-country-profile",
    description:
      "Add curated matches array and flag to Country Profile",
    up: up006,
    down: down006,
  },
  {
    id: "007-match-teams-as-strings",
    description:
      "Change Match home/away teams from Country Profile links to text",
    up: up007,
    down: down007,
  },
  {
    id: "008-create-fast-fact-item-content-type",
    description:
      "Create Fast Fact Item content type (label, value, Material icon)",
    up: up008,
    down: down008,
  },
  {
    id: "009-create-country-cultural-highlights-content-type",
    description:
      "Create Country Cultural Highlights content type (description, tags)",
    up: up009,
    down: down009,
  },
  {
    id: "010-add-facts-and-highlights-to-country-profile",
    description:
      "Add Fast Facts array and Cultural Highlights link to Country Profile",
    up: up010,
    down: down010,
  },
  {
    id: "011-create-post-content-type",
    description:
      "Create Post content type (title, slug, categories, author, featured image, content, SEO)",
    up: up011,
    down: down011,
  },
  {
    id: "012-create-home-hero-content-type",
    description:
      "Create Home Hero content type (title, description, hero image)",
    up: up012,
    down: down012,
  },
  {
    id: "013-create-home-page-content-type",
    description: "Create Home Page content type (slug, hero, SEO)",
    up: up013,
    down: down013,
  },
  {
    id: "014-post-slug-from-title",
    description:
      "Configure Post slug field to auto-generate from title in Contentful",
    up: up014,
    down: down014,
  },
];
