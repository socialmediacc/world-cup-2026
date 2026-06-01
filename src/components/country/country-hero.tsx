import Image from "next/image";

import type { CountryHeroEntry } from "@/contentful/types/graphql";

type CountryHeroProps = {
  hero: CountryHeroEntry;
};

export function CountryHero({ hero }: CountryHeroProps) {
  const imageUrl = hero.backgroundImage?.url;

  return (
    <section className="group relative mb-stack-lg h-[60vh] min-h-[400px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-secondary-fixed-dim">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={
              hero.backgroundImage?.title ?? hero.title ?? "Country hero"
            }
            fill
            priority
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/40 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end px-margin-mobile pb-12 md:px-margin-desktop">
        <div className="max-w-3xl translate-y-4 transform opacity-0 animate-[slideUp_0.8s_ease-out_forwards]">
          <h1 className="mb-4 font-display-lg-mobile text-display-lg-mobile leading-tight text-on-primary drop-shadow-md md:font-display-lg md:text-display-lg">
            {hero.title}
          </h1>
          {hero.description ? (
            <p className="max-w-2xl font-body-lg text-body-lg text-surface-container-low drop-shadow">
              {hero.description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
