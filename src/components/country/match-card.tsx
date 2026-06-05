import Image from "next/image";
import Link from "next/link";

import { formatKickoff } from "@/components/country/format-kickoff";
import { MaterialSymbol } from "@/components/ui/material-symbol";
import type { MatchEntry } from "@/contentful/types/graphql";

type MatchCardProps = {
  match: MatchEntry;
  profileCountryName?: string | null;
  profileFlagUrl?: string | null;
};

function teamMatchesProfile(
  teamName: string | null | undefined,
  profileCountryName: string | null | undefined,
): boolean {
  if (!teamName || !profileCountryName) {
    return false;
  }

  return teamName.trim().toLowerCase() === profileCountryName.trim().toLowerCase();
}

function TeamFlag({ flagUrl, name }: { flagUrl?: string | null; name?: string | null }) {
  return (
    <div className="flex h-6 w-10 items-center justify-center overflow-hidden rounded-sm bg-surface-container text-[18px]">
      {flagUrl ? (
        <Image
          src={flagUrl}
          alt={name ? `${name} flag` : "Team flag"}
          width={40}
          height={24}
          className="h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}

function TeamRow({
  countryName,
  align = "left",
}: {
  countryName?: string | null;
  align?: "left" | "right";
}) {
  const content = (
    <>
      <span className="font-headline-md text-body-lg font-semibold">{countryName}</span>
    </>
  );  

  if (align === "right") {
    return (
      <div className="flex flex-row-reverse items-center gap-3 text-right">
        {content}
      </div>
    );
  }

  return <div className="flex items-center gap-3">{content}</div>;
}

export function MatchCard({
  match,
  profileCountryName,
}: MatchCardProps) {
  const kickoffLabel = match.kickoff ? formatKickoff(match.kickoff) : null;

  const profileIsAway = teamMatchesProfile(match.awayTeam, profileCountryName);
  const leftTeam = profileIsAway ? match.awayTeam : match.homeTeam;
  const rightTeam = profileIsAway ? match.homeTeam : match.awayTeam;

  return (
    <article className="flex flex-col rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(8,27,58,0.15)]">
      {kickoffLabel ? (
        <div className="mb-4 flex items-center gap-2 font-caption text-caption font-semibold text-primary">
          <MaterialSymbol name="calendar_today" className="text-[18px]" />
          <span>{kickoffLabel}</span>
        </div>
      ) : null}

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <TeamRow countryName={leftTeam} align="left" />
          <span className="font-caption text-caption font-bold uppercase text-on-surface-variant">
            VS
          </span>
          <TeamRow countryName={rightTeam} align="right" />
        </div>
      </div>

      {match.venue ? (
        <div className="mb-6 flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
          <MaterialSymbol name="location_on" className="text-[18px]" />
          <span>{match.venue}</span>
        </div>
      ) : null}

      {match.ticketUrl ? (
        <Link
          href={match.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary transition-colors hover:bg-surface-tint"
        >
          <span>Get Tickets</span>
          <MaterialSymbol name="confirmation_number" className="text-[18px]" />
        </Link>
      ) : null}
    </article>
  );
}
