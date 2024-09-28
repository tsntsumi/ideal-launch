import NextImage from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useStorage, useStorageDownloadURL } from 'reactfire'
import { ref } from 'firebase/storage'

export type ImageSource = {
  asset: string
  src?: string | undefined
  width: number
  height: number
  alt: string
  blurDataURL?: string | undefined
}

export default function StorageImage({
  image, preloadImage = false, className, fill = false, sizes, alt, loading
}: {
  image: ImageSource
  alt: string
  preloadImage?: boolean
  className?: string
  fill?: boolean
  sizes?: string
  loading?: string
}) {
  if (!image || !image?.asset.length) {
    return <PhotoIcon />
  }
  if (!Object.hasOwn(image, 'src') || !image.src?.length || image.src === '/logo.svg') {
    image.src = '/logo.svg'
    const storage = useStorage()
    const r = ref(storage, image.asset)
    const { status, data: url } = useStorageDownloadURL(r)
    if (status === 'loading') {
      return <PhotoIcon />
    }
    image.src = url
  }
  return (
    <NextImage
      src={image.src}
      {...(image.blurDataURL && {
        placeholder: "blur",
        blurDataURL: image.blurDataURL
      })}
      {...(loading && { loading: loading })}
      alt={image.alt || "Thumbnail"}
      priority={preloadImage ? true : false}
      className="object-cover transition-all"
      fill
    />)
}
