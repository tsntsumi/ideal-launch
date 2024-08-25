import { Image } from "./types"

export const urlForImage = (source: Image|null|undefined): Image | null => {
  if (!source) {
    return null
  }
  if (!source?.src) {
    source.src = ""
  }
  if (!source.asset?.length) {
    return null
  }

  const dimensions = source.asset?.split(/[-$@.]/)?.slice(-2,-1).pop()
  if (!dimensions?.length) {
    source.width ||= 256
    source.height ||= 256

    return source
  }

  const [width, height] = dimensions
    .split(/[xX]/)
    .map(num => parseInt(num, 10));

  source.width ||= (width || 256)
  source.height ||= (height || 256)

  source.blurDataURL = `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsnbOmHgAFyQJOYpCKIwAAAABJRU5ErkJggg==`

  return source
}
