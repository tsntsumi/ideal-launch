export type ImageSource = {
  alt?: string
  caption?: string
  asset: string
  width: number
  height: number
  src?: string | null
}

export type Slug = {
  current: string
}

type Author = {
  name: string
  bio: string
  image: ImageSource
  slug: Slug
}

type Category = {
  color: string
  count: number
  description: string
  title: string
  slug: Slug
}
