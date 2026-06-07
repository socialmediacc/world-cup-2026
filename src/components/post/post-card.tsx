import Image from "next/image";
import Link from "next/link";

import type { PostSummary } from "@/contentful/utils/map-post-summary";

type PostCardProps = {
  post: PostSummary;
};

function getAuthorInitial(author: string): string {
  const trimmed = author.trim();

  return trimmed ? trimmed.charAt(0).toUpperCase() : "?";
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group hover-lift flex flex-col gap-3 rounded-xl border border-outline/10 bg-surface-container-lowest p-4"
    >
      <div className="relative h-32 w-full overflow-hidden rounded-lg">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt ?? post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <h4 className="font-label-md text-on-background transition-colors group-hover:text-primary">
        {post.title}
      </h4>

      {post.excerpt ? (
        <p className="text-caption text-on-surface-variant">{post.excerpt}</p>
      ) : null}

      {post.author ? (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-variant text-caption font-bold text-on-background">
            {getAuthorInitial(post.author)}
          </div>
          <p className="font-label-md text-caption text-on-background">
            {post.author}
          </p>
        </div>
      ) : null}
    </Link>
  );
}
