import Image from "next/image";

type PostFeaturedImageProps = {
  url: string;
  alt?: string;
};

export function PostFeaturedImage({ url, alt = "" }: PostFeaturedImageProps) {
  return (
    <figure className="relative h-[60vh] w-full overflow-hidden rounded-xl border border-secondary/10 shadow-lg shadow-on-background/15 md:col-span-12 md:h-[70vh]">
      <Image
        src={url}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </figure>
  );
}
