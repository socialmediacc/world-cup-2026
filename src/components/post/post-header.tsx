// import { MaterialSymbol } from "@/components/ui/material-symbol";

type PostHeaderProps = {
  title: string;
  category?: string;
  author?: string;
};

export function PostHeader({ title, category, author }: PostHeaderProps) {
  return (
    <header className="mb-stack-md text-center md:col-span-8 md:col-start-3">
      {category ? (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-tertiary-fixed/15 px-3 py-1 font-label-md text-caption text-on-secondary-fixed">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
          {category}
        </div>
      ) : null}
      <h1 className="mb-4 font-display-lg-mobile text-display-lg-mobile text-on-background md:font-display-lg md:text-display-lg">
        {title}
      </h1>
      {author ? (
        <p className="mx-auto mb-6 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Written by {author}
        </p>
      ) : null}
      {/* Share / bookmark actions — reserved for a future iteration
      <div className="mb-stack-md flex justify-center gap-4">
        <button
          type="button"
          aria-label="Share post"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface text-on-surface-variant transition-colors hover:border-primary hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <MaterialSymbol name="share" />
        </button>
        <button
          type="button"
          aria-label="Bookmark post"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface text-on-surface-variant transition-colors hover:border-primary hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <MaterialSymbol name="bookmark" />
        </button>
      </div>
      */}
    </header>
  );
}
