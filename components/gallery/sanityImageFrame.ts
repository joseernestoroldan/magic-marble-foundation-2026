import { Crop, HotSpot } from "@/clientTypes";

const DEFAULT_ASPECT = 4 / 3;

/**
 * Maps Sanity hotspot + crop to a CSS object-position on the full source image.
 */
export function getSanityObjectPosition(
  hotspot: HotSpot | null,
  crop: Crop | null,
): string {
  if (!hotspot) return "center center";

  let x = hotspot.x;
  let y = hotspot.y;

  if (crop) {
    const cropW = 1 - crop.left - crop.right;
    const cropH = 1 - crop.top - crop.bottom;
    x = crop.left + hotspot.x * cropW;
    y = crop.top + hotspot.y * cropH;
  }

  return `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%`;
}

export function getSanityImageFrame(
  hotspot: HotSpot | null,
  crop: Crop | null,
  fallbackAspect = DEFAULT_ASPECT,
) {
  const aspectRatio = crop
    ? (() => {
        const cropW = 1 - crop.left - crop.right;
        const cropH = 1 - crop.top - crop.bottom;
        return cropW > 0 && cropH > 0 ? cropW / cropH : fallbackAspect;
      })()
    : fallbackAspect;
  return {
    objectPosition: getSanityObjectPosition(hotspot, crop),
    aspectRatio,
  };
}

/** Fits cropped aspect ratio inside a max viewport box (modal). */
export function getModalFrameWidth(aspectRatio: number, maxVw = 96, maxVh = 94): string {
  return `min(${maxVw}vw, calc(${maxVh}vh * ${aspectRatio}))`;
}
