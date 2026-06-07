import Image from "next/image";
import Link from "next/link";

import { InstagramIcon, XIcon } from "@/components/ui/social-icons";
import { SITE_COPY, SITE_LINKS } from "@/constants/site-links";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface shadow-sm">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link href="/" className="transition-transform duration-200 hover:scale-[1.02]">
          <Image
            src={SITE_LINKS.logoHeader}
            alt="CentreCanada Logo"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={SITE_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
          >
            <InstagramIcon className="h-6 w-6" />
          </a>
          <a
            href={SITE_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
          >
            <XIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE_LINKS.centreCanadaWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-primary bg-primary px-4 py-2 font-label-md text-label-md text-on-primary shadow-sm transition-colors duration-200 hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container hover:shadow-md sm:px-6"
          >
            {SITE_COPY.centreCanadaWebsiteLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
