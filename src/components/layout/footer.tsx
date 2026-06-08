import Image from "next/image";
import Link from "next/link";

import { InstagramIcon, XIcon } from "@/components/ui/social-icons";
import { SITE_COPY, SITE_LINKS } from "@/constants/site-links";

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest">
      <div className="mx-auto max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <div className="md:col-span-3">
            <Link href="/" className="inline-block">
              <Image
                src={SITE_LINKS.logoFooter}
                alt="CentreCanada Logo"
                width={220}
                height={80}
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="md:col-span-6">
            <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
              {SITE_COPY.footerDescription}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end">
            <a
              href={SITE_LINKS.centreCanadaWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent font-label-md text-label-md text-secondary transition-all hover:border-primary hover:text-primary"
            >
              {SITE_COPY.centreCanadaWebsiteLabel}
            </a>
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </div>

        <div className="mt-stack-md border-t border-outline-variant/30 pt-stack-md">
          <p className="text-center font-caption text-caption text-on-surface-variant">
            {SITE_COPY.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
