import { CulturalHighlights } from "@/components/country/cultural-highlights";
import { FastFacts } from "@/components/country/fast-facts";
import type {
  CountryCulturalHighlightsEntry,
  FastFactItemEntry,
} from "@/contentful/types/graphql";

type CountryInsightsProps = {
  fastFacts?: Array<FastFactItemEntry | null> | null;
  culturalHighlights?: CountryCulturalHighlightsEntry | null;
};

function hasFastFacts(
  facts?: Array<FastFactItemEntry | null> | null,
): boolean {
  return Boolean(
    facts?.some(
      (fact) => fact != null && Boolean(fact.label) && Boolean(fact.value),
    ),
  );
}

function hasCulturalHighlights(
  highlights?: CountryCulturalHighlightsEntry | null,
): boolean {
  return Boolean(highlights?.description);
}

export function CountryInsights({
  fastFacts,
  culturalHighlights,
}: CountryInsightsProps) {
  if (!hasFastFacts(fastFacts) && !hasCulturalHighlights(culturalHighlights)) {
    return null;
  }

  return (
    <div className="mb-stack-lg grid grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-12 md:px-margin-desktop">
      <FastFacts facts={fastFacts} />
      <CulturalHighlights highlights={culturalHighlights} />
    </div>
  );
}
