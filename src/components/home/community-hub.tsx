import Link from "next/link";

import { PostCard } from "@/components/post/post-card";
import { MaterialSymbol } from "@/components/ui/material-symbol";
import type { PostSummary } from "@/contentful/utils/map-post-summary";

export const HOMEPAGE_POSTS_LIMIT = 9;

type CommunityHubProps = {
  posts: PostSummary[];
};

export function CommunityHub({ posts }: CommunityHubProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mb-stack-lg -mx-margin-mobile bg-surface px-margin-mobile py-stack-lg md:-mx-margin-desktop md:px-margin-desktop">
      <div className="mb-stack-md flex items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Community Hub
          </h2>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Stay updated with the latest news, events, and community stories.
          </p>
        </div>
        <Link
          href="/posts"
          className="flex shrink-0 items-center gap-2 font-label-md text-label-md text-primary hover:underline"
        >
          View All
          <MaterialSymbol name="arrow_forward" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
