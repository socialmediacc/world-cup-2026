import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CommunityHub, HOMEPAGE_POSTS_LIMIT } from "@/components/home/community-hub";
import { HomeHero } from "@/components/home/home-hero";
import { ParticipatingNations } from "@/components/home/participating-nations";
import { PageContainer } from "@/components/page-container";
import { HOME_PAGE_SLUG } from "@/contentful/constants/home";
import {
  buildPageMetadata,
  fetchHomePageBySlug,
  fetchPosts,
  getHomepageCountries,
} from "@/contentful";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const home = await fetchHomePageBySlug({ slug: HOME_PAGE_SLUG });

  if (!home) {
    return {};
  }

  return buildPageMetadata({
    title: home.hero.title,
    seo: home.seo,
  });
}

export default async function HomePage() {
  const [home, { items: posts }, countries] = await Promise.all([
    fetchHomePageBySlug({ slug: HOME_PAGE_SLUG }),
    fetchPosts({ page: 1, limit: HOMEPAGE_POSTS_LIMIT }),
    getHomepageCountries(),
  ]);

  if (!home?.hero) {
    notFound();
  }

  return (
    <PageContainer>
      <main className="w-full px-margin-mobile pt-stack-md pb-stack-lg md:px-margin-desktop md:py-stack-lg">
        <HomeHero hero={home.hero} />
        <CommunityHub posts={posts} />
        <ParticipatingNations countries={countries} />
      </main>
    </PageContainer>
  );
}
