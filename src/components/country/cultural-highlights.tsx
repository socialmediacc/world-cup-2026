import { MaterialSymbol } from "@/components/ui/material-symbol";
import type { CountryCulturalHighlightsEntry } from "@/contentful/types/graphql";

type CulturalHighlightsProps = {
  highlights?: CountryCulturalHighlightsEntry | null;
};

const TAG_CHIP_STYLES = [
  "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant border-tertiary-fixed-dim/20",
  "bg-primary-container/10 text-on-primary-fixed-variant border-primary/20",
  "bg-secondary-fixed/50 text-on-secondary-fixed-variant border-secondary/20",
  "bg-surface-container-high text-on-surface-variant border-outline-variant/30",
] as const;

export function CulturalHighlights({ highlights }: CulturalHighlightsProps) {
  if (!highlights?.description) {
    return null;
  }

  const tags = highlights.tags?.filter(
    (tag): tag is string => tag != null && tag.trim() !== "",
  );

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_-10px_rgba(8,27,58,0.15)] md:col-span-8">
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 opacity-5">
        <MaterialSymbol
          name="sports_soccer"
          className="text-[256px]"
        />
      </div>
      <div>
        <div className="relative z-10 mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-container/10 text-tertiary">
            <MaterialSymbol name="festival" />
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Cultural Highlights
          </h2>
        </div>
        <p className="relative z-10 mb-6 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          {highlights.description}
        </p>
      </div>
      {tags?.length ? (
        <div className="relative z-10 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className={[
                "rounded-full border px-3 py-1 font-caption text-caption font-semibold",
                TAG_CHIP_STYLES[index % TAG_CHIP_STYLES.length],
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
