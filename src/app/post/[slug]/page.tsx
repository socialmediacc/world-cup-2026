import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/page-container";
import { PostBody } from "@/components/post/post-body";
import { PostFeaturedImage } from "@/components/post/post-featured-image";
import { PostHeader } from "@/components/post/post-header";
import {
  buildPageMetadata,
  fetchPostBySlug,
  fetchPostSlugs,
} from "@/contentful";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug({ slug });

  if (!post) {
    return {};
  }

  return buildPageMetadata({
    title: post.title,
    seo: post.seo,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug({ slug });

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <main className="px-margin-mobile py-stack-lg md:px-margin-desktop">
        <article className="mb-stack-lg grid grid-cols-1 gap-gutter md:grid-cols-12">
          <PostHeader
            title={post.title}
            category={post.categories[0]}
            author={post.author}
          />
          <PostFeaturedImage
            url={post.featuredImage.url}
            alt={post.featuredImage.alt}
          />
        </article>
        <PostBody
          content={post.content}
          embeddedAssets={post.embeddedAssets}
        />
      </main>
    </PageContainer>
  );
}
