import { CountryCard } from "@/components/country/country-card";
import { PARTICIPATING_NATIONS_SECTION_ID } from "@/constants/home-sections";
import type { HomepageCountry } from "@/contentful/utils/map-homepage-country";

type ParticipatingNationsProps = {
  countries: HomepageCountry[];
};

export function ParticipatingNations({ countries }: ParticipatingNationsProps) {  if (countries.length === 0) {
    return null;
  }

  return (
    <section id={PARTICIPATING_NATIONS_SECTION_ID} className="mb-stack-lg scroll-mt-8">
      <header className="mb-stack-md">
        <h2 className="font-headline-lg text-headline-lg text-primary">
          Participating Nations
        </h2>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Explore the cultures making up the tournament playing in Canada.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-gutter md:grid-cols-5">
        {countries.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>
    </section>
  );
}
