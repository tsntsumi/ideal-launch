export type Image = {
  alt: string
  caption: string
  asset: string // image file name in storage
  src: string | undefined | null // download url
  width: number
  height: number
}
