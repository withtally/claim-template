import cx from "classnames";
import { Breakpoints } from "config/breakpoints";
import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";

type Layout = "cover" | "contain" | "fill" | "undefined";

const LAYOUT: Record<Layout, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  undefined: "",
};

const DEFAULT_SIZES = `(max-width: ${Breakpoints["md"]}px) 96vw, (max-width: ${Breakpoints["lg"]}px) 96vw, (max-width: ${Breakpoints["3xl"]}px) 96vw`; // Size of an image that spans the full width of screen

export interface OptimisedImageProps
  extends Omit<ImageProps, "layout" | "width"> {
  src: string;
  alt: string;
  layout?: Layout;
  sizes?: string;
  hasLoadAnimation?: boolean;
  className?: string;
  imgClassName?: string;
}

export const OptimisedImage: FC<OptimisedImageProps> = ({
  src,
  alt,
  layout = "contain",
  sizes = DEFAULT_SIZES,
  hasLoadAnimation = true,
  className,
  imgClassName,
  ...props
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div className={cx("relative transform-gpu select-none", className)}>
      {/* Do not optimise gif images */}
      {src.includes(".gif") ? (
        <img
          src={src}
          alt={alt}
          className={cx("w-full", className)}
          {...props}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          quality={100}
          fill
          onLoadingComplete={() => setHasLoaded(true)}
          className={cx(
            "next-image transition-[opacity,filter]",
            imgClassName,
            LAYOUT[layout],
            {
              "opacity-0 blur-sm": !hasLoaded && hasLoadAnimation,
            },
          )}
          {...props}
        />
      )}
    </div>
  );
};
