import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CountryHero } from "@/components/country/country-hero";
import { CountryInsights } from "@/components/country/country-insights";
import { UpcomingMatches } from "@/components/country/upcoming-matches";
import {
  buildPageMetadata,
  fetchCountries,
  fetchCountryBySlug,
} from "@/contentful";
import { PageContainer } from "@/components/page-container";

type CountryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const countries = await fetchCountries();

  return countries
    .filter((country): country is NonNullable<typeof country> =>
      Boolean(country?.slug),
    )
    .map((country) => ({ slug: country.slug! }));
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = await fetchCountryBySlug({ slug });

  if (!country) {
    return {};
  }

  return buildPageMetadata({
    title: country.name,
    seo: country.seo,
  });
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = await fetchCountryBySlug({ slug });

  if (!country?.hero) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="min-h-full bg-background text-on-background">
        <CountryHero hero={country.hero} />
        <CountryInsights
          fastFacts={country.fastFactsCollection?.items}
          culturalHighlights={country.culturalHighlights}
        />
        <UpcomingMatches
          matches={country.matchesCollection?.items}
          countryName={country.name}
        />
      </div>
    </PageContainer>
  );
}
