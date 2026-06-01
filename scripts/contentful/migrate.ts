import { config } from "dotenv";
import { resolve } from "node:path";

import { runContentfulMigrations } from "@/contentful/migrations/runner";

const projectRoot = process.cwd();

config({ path: resolve(projectRoot, ".env"), quiet: true });
config({ path: resolve(projectRoot, ".env.local"), override: true, quiet: true });

function printUsage(): void {
  console.log(`
Usage: pnpm contentful:migrate [options]

Options:
  --only <id>       Run specific migration(s), comma-separated
  --down            Run down migrations (reverse order)
  --help            Show this message

Examples:
  pnpm contentful:migrate
  pnpm contentful:migrate --only 001-create-country-hero-content-type
  pnpm contentful:migrate --down --only 001-create-country-hero-content-type
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }

  const direction = args.includes("--down") ? "down" : "up";
  const onlyIndex = args.indexOf("--only");
  const only =
    onlyIndex >= 0 && args[onlyIndex + 1]
      ? args[onlyIndex + 1].split(",").map((id) => id.trim())
      : undefined;

  await runContentfulMigrations({ only, direction, yes: true });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
