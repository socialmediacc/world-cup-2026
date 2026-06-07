import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { PostCard } from "@/components/post/post-card";
import { PostsPagination } from "@/components/post/posts-pagination";
import {
  fetchPosts,
  getPostsCount,
  POSTS_PAGE_SIZE,
} from "@/contentful";

type PostsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community Hub | World Cup Welcome Canada",
  description:
    "Stay updated with the latest news, events, and community stories from World Cup Welcome Canada.",
};

function parsePageParam(pageParam: string | undefined): number {
  const parsed = Number(pageParam);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { page: pageParam } = await searchParams;
  const requestedPage = parsePageParam(pageParam);

  const total = await getPostsCount();
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PAGE_SIZE));
  const currentPage =
    total > 0 ? Math.min(requestedPage, totalPages) : 1;

  const { items } = await fetchPosts({
    page: currentPage,
    limit: POSTS_PAGE_SIZE,
  });

  return (
    <PageContainer>
      <main className="px-margin-mobile py-stack-lg md:px-margin-desktop">
        <header className="mb-stack-md">
          <h1 className="font-headline-lg text-headline-lg text-primary">
            Community Hub
          </h1>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Stay updated with the latest news, events, and community stories.
          </p>
        </header>

        {items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {items.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <PostsPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        ) : (
          <div className="rounded-xl border border-outline/10 bg-surface-container-lowest p-stack-md text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              No posts available yet. Check back soon for community stories and
              updates.
            </p>
            {requestedPage > 1 ? (
              <Link
                href="/posts"
                className="mt-4 inline-block font-label-md text-label-md text-primary hover:underline"
              >
                Back to first page
              </Link>
            ) : null}
          </div>
        )}
      </main>
    </PageContainer>
  );
}
