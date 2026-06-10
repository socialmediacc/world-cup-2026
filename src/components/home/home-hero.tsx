import Image from "next/image";

import { PARTICIPATING_NATIONS_SECTION_ID } from "@/constants/home-sections";
import type { HomeHero as HomeHeroData } from "@/contentful/utils/map-home";

type HomeHeroProps = {
  hero: HomeHeroData;
};

export function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section className="relative mb-stack-lg mt-0 overflow-hidden rounded-xl border border-outline/10 bg-surface-container-lowest shadow-[0_10px_40px_-10px_rgba(8,27,58,0.15)] md:mt-stack-lg">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
        <div className="z-10 flex flex-col justify-center bg-surface-container-lowest p-stack-lg">
          <h1 className="mb-stack-sm font-display-lg text-display-lg text-primary">
            {hero.title}
          </h1>
          <p className="mb-stack-md max-w-[90%] font-body-lg text-body-lg text-on-surface-variant">
            {hero.description}
          </p>
          <div className="mt-stack-sm flex flex-wrap gap-4">
            <a
              href={`#${PARTICIPATING_NATIONS_SECTION_ID}`}
              className="rounded-lg border-2 border-primary bg-primary px-8 py-3 font-label-md text-label-md text-on-primary shadow-sm transition-colors duration-200 hover:-translate-y-[2px] hover:bg-primary-container hover:shadow-md"
            >
              Explore Countries
            </a>
          </div>
        </div>
        <div className="relative h-full min-h-[400px] md:min-h-full">
          <div className="absolute inset-0 z-10 hidden w-1/4 bg-gradient-to-r from-surface-container-lowest to-transparent md:block" />
          <Image
            src={hero.heroImage.url}
            alt={hero.heroImage.alt ?? hero.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
