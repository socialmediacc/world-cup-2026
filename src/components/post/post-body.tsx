import type { Document } from "@contentful/rich-text-types";

import { RichTextDocument } from "@/components/contentful/rich-text-document";
import type { ContentfulAsset } from "@/contentful/types/graphql";

type PostBodyProps = {
  content: Document;
  embeddedAssets?: Record<string, ContentfulAsset>;
};

export function PostBody({ content, embeddedAssets }: PostBodyProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 text-on-background md:col-span-12">
      <RichTextDocument document={content} embeddedAssets={embeddedAssets} />
    </div>
  );
}
