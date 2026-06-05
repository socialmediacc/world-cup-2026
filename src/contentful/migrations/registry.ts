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
];
