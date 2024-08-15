// import createImageUrlBuilder from "@sanity/image-url";
import app from './config'
import { ref, getDownloadURL, getStorage } from "firebase/storage"
import { type ImageSource, Slug } from './types'

const storage = !app ? null : getStorage(app)

export const urlForImage = (source: ImageSource): ImageSource | null => {
  if (!source) {
    return null
  }
  if (!source['src']) {
    source['src'] = null
  }
  if (!source.asset || (source['src'] || "").length > 0) {
    return source;
  }
  const u = source
  const dimensions = u.asset?.split(/[-$.]/)?.slice(-2,-1).pop()
  if (!dimensions?.length) {
    return u
  }

  const [width, height] = dimensions
    .split(/[xX]/)
    .map(num => parseInt(num, 10));

  u.width = width || 1024
  u.height = height || 574
  
  if (!u['src']) {
    u.src = null
  }

  return u
}

export async function getAssetURL(asset: string): Promise<string> {
  if (!storage) {
    return ""
  }
  const r = ref(storage, asset)
  const u = await getDownloadURL(r)
  return u
}
