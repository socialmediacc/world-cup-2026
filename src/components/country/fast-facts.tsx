import { MaterialSymbol } from "@/components/ui/material-symbol";
import type { FastFactItemEntry } from "@/contentful/types/graphql";

type FastFactsProps = {
  facts?: Array<FastFactItemEntry | null> | null;
};

export function FastFacts({ facts }: FastFactsProps) {
  const items = facts?.filter(
    (fact): fact is FastFactItemEntry =>
      fact != null && Boolean(fact.label) && Boolean(fact.value),
  );

  if (!items?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_-10px_rgba(8,27,58,0.15)] md:col-span-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/10 text-primary">
          <MaterialSymbol name="info" />
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Fast Facts
        </h2>
      </div>
      <ul className="space-y-4">
        {items.map((fact, index) => (
          <li
            key={fact.sys?.id ?? `${fact.label}-${fact.value}-${index}`}
            className="flex items-start gap-3"
          >
            {fact.icon ? (
              <MaterialSymbol
                name={fact.icon}
                className="mt-1 text-outline"
              />
            ) : null}
            <div>
              <p className="font-caption text-caption uppercase tracking-wider text-on-surface-variant">
                {fact.label}
              </p>
              <p className="font-body-md text-body-md font-semibold text-on-surface">
                {fact.value}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
