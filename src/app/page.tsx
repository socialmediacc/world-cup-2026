import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CommunityHub, HOMEPAGE_POSTS_LIMIT } from "@/components/home/community-hub";
import { HomeHero } from "@/components/home/home-hero";
import { PageContainer } from "@/components/page-container";
import { HOME_PAGE_SLUG } from "@/contentful/constants/home";
import {
  buildPageMetadata,
  fetchHomePageBySlug,
  fetchPosts,
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
  const [home, { items: posts }] = await Promise.all([
    fetchHomePageBySlug({ slug: HOME_PAGE_SLUG }),
    fetchPosts({ page: 1, limit: HOMEPAGE_POSTS_LIMIT }),
  ]);

  if (!home?.hero) {
    notFound();
  }

  return (
    <PageContainer>
      <main className="w-full px-margin-mobile py-stack-lg md:px-margin-desktop">
        <HomeHero hero={home.hero} />
        <CommunityHub posts={posts} />
      </main>
    </PageContainer>
  );
}
