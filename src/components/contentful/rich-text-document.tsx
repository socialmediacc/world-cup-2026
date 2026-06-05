"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Block,
  type Document,
  type Inline,
} from "@contentful/rich-text-types";
import Image from "next/image";
import type { ReactNode } from "react";

import type { ContentfulAsset } from "@/contentful/types/graphql";

type RichTextDocumentProps = {
  document: Document;
  embeddedAssets?: Record<string, ContentfulAsset>;
};

const paragraphClassName =
  "font-body-lg text-body-lg leading-relaxed text-on-background";

const dropCapClassName =
  "first-letter:text-5xl first-letter:font-headline-lg first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none";

function createOptions(
  isFirstParagraph: { current: boolean },
  embeddedAssets: Record<string, ContentfulAsset>,
) {
  return {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => (
        <strong className="font-semibold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: ReactNode) => (
        <em className="italic">{text}</em>
      ),
      [MARKS.UNDERLINE]: (text: ReactNode) => <u>{text}</u>,
      [MARKS.CODE]: (text: ReactNode) => (
        <code className="rounded bg-surface-container px-1 py-0.5 font-mono text-sm">
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => {
        const className = isFirstParagraph.current
          ? `${paragraphClassName} ${dropCapClassName}`
          : paragraphClassName;

        isFirstParagraph.current = false;

        return <p className={className}>{children}</p>;
      },
      [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
        <h2 className="font-headline-md text-headline-md text-on-background">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
        <h3 className="font-headline-md text-headline-md text-on-background">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_node: unknown, children: ReactNode) => (
        <h4 className="font-label-md text-label-md text-on-background">
          {children}
        </h4>
      ),
      [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
        <ul className="list-disc space-y-2 pl-6 font-body-lg text-body-lg text-on-background">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
        <ol className="list-decimal space-y-2 pl-6 font-body-lg text-body-lg text-on-background">
          {children}
        </ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
        <li>{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
        <blockquote className="my-stack-md rounded-xl border-l-4 border-primary bg-surface-container-low p-6 shadow-sm">
          <div className="font-headline-md text-headline-md italic text-primary-fixed-dim">
            {children}
          </div>
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <hr className="border-outline-variant/30" aria-hidden />
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const target = node.data.target as { sys?: { id?: string } } | undefined;
        const assetId = target?.sys?.id;

        if (!assetId) {
          return null;
        }

        const asset = embeddedAssets[assetId];
        const url = asset?.url;

        if (!url) {
          return null;
        }

        const width = asset.width ?? 1200;
        const height = asset.height ?? 675;
        const alt = asset.description ?? asset.title ?? "";

        return (
          <figure className="relative my-stack-md aspect-video w-full overflow-hidden rounded-xl border border-secondary/10 shadow-lg">
            <Image
              src={url}
              alt={alt}
              width={width}
              height={height}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </figure>
        );
      },
      [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
        const uri = typeof node.data.uri === "string" ? node.data.uri : "#";

        return (
        <a
          href={uri}
          className="text-primary underline-offset-2 transition-colors hover:text-primary-container hover:underline"
          rel={uri.startsWith("http") ? "noopener noreferrer" : undefined}
          target={uri.startsWith("http") ? "_blank" : undefined}
        >
          {children}
        </a>
        );
      },
    },
  };
}

export function RichTextDocument({
  document,
  embeddedAssets = {},
}: RichTextDocumentProps) {
  const isFirstParagraph = { current: true };

  return (
    <div className="space-y-6">
      {documentToReactComponents(
        document,
        createOptions(isFirstParagraph, embeddedAssets),
      )}
    </div>
  );
}
