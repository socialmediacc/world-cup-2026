import Image from "next/image";
import Link from "next/link";

import type { HomepageCountry } from "@/contentful/utils/map-homepage-country";

type CountryCardProps = {
  country: HomepageCountry;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/country/${country.slug}`}
      className="group hover-lift flex flex-col items-center gap-4 rounded-xl border border-outline/10 bg-surface-container-lowest p-stack-sm text-center"
    >
      <div className="relative mt-2 h-20 w-20 overflow-hidden rounded-full border border-outline/20 shadow-sm">
        <Image
          src={country.flag.url}
          alt={country.flag.alt ?? `${country.name} flag`}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <h3 className="font-headline-md text-headline-md text-lg text-on-background">
        {country.name}
      </h3>

      <span className="mt-auto w-full rounded-lg bg-surface-container px-4 py-2 font-label-md text-label-md text-on-surface transition-colors group-hover:bg-surface-variant">
        View Details
      </span>
    </Link>
  );
}
