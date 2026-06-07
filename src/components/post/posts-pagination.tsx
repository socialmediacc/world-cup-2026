import Link from "next/link";

import { MaterialSymbol } from "@/components/ui/material-symbol";

type PostsPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

function buildPageHref(basePath: string, page: number): string {
  if (page <= 1) {
    return basePath;
  }

  return `${basePath}?page=${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  for (let offset = -1; offset <= 1; offset += 1) {
    const page = currentPage + offset;

    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export function PostsPagination({
  currentPage,
  totalPages,
  basePath = "/posts",
}: PostsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Posts pagination"
      className="mt-stack-lg flex flex-wrap items-center justify-center gap-2"
    >
      {hasPrevious ? (
        <Link
          href={buildPageHref(basePath, currentPage - 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/30 px-4 py-2 font-label-md text-label-md text-on-surface transition-colors hover:border-primary hover:text-primary"
        >
          <MaterialSymbol name="chevron_left" />
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/20 px-4 py-2 font-label-md text-label-md text-on-surface-variant/50"
        >
          <MaterialSymbol name="chevron_left" />
          Previous
        </span>
      )}

      <div className="flex flex-wrap items-center gap-1">
        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const showEllipsis = previousPage != null && page - previousPage > 1;

          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis ? (
                <span className="px-2 text-on-surface-variant" aria-hidden>
                  …
                </span>
              ) : null}
              {page === currentPage ? (
                <span
                  aria-current="page"
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-primary px-3 font-label-md text-label-md text-on-primary"
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={buildPageHref(basePath, page)}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container hover:text-primary"
                >
                  {page}
                </Link>
              )}
            </span>
          );
        })}
      </div>

      {hasNext ? (
        <Link
          href={buildPageHref(basePath, currentPage + 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/30 px-4 py-2 font-label-md text-label-md text-on-surface transition-colors hover:border-primary hover:text-primary"
        >
          Next
          <MaterialSymbol name="chevron_right" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center gap-1 rounded-lg border border-outline-variant/20 px-4 py-2 font-label-md text-label-md text-on-surface-variant/50"
        >
          Next
          <MaterialSymbol name="chevron_right" />
        </span>
      )}
    </nav>
  );
}
