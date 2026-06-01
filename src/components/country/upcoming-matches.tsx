import { MatchCard } from "@/components/country/match-card";
import type { MatchEntry } from "@/contentful/types/graphql";

type UpcomingMatchesProps = {
  matches?: Array<MatchEntry | null> | null;
  countryName?: string | null;
};

export function UpcomingMatches({
  matches,
  countryName,
}: UpcomingMatchesProps) {
  const items = matches?.filter(
    (match): match is MatchEntry => match != null && Boolean(match.kickoff),
  );

  if (!items?.length) {
    return null;
  }

  return (
    <section className="px-margin-mobile py-stack-lg md:px-margin-desktop">
      <h2 className="mb-stack-md font-headline-lg text-headline-lg text-on-surface">
        Matches
      </h2>
      <div className="grid gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {items.map((match, index) => (
          <MatchCard
            key={`${index}`}
            match={match}
            profileCountryName={countryName}
          />
        ))}
      </div>
    </section>
  );
}
