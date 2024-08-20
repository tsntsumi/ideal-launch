export type Image = {
  alt: string
  asset: string
  caption?: string
  height: number
  width: number
  src?: string | null | undefined
}

export type Slug = {
  current: string
}

export type Author = {
  _id: string
  name: string
  bio: string
  image: Image
  slug: Slug
}

export type Category = {
  _id: string
  color: string
  count: number
  description: string
  title: string
  slug: Slug
}

export type Body = {
  type: string
  value: string
}

export type Post = {
  _id?: string | undefined
  title: string
  author: Author
  body: Body[]
  categories: Category[]
  createdAt: string
  publishedAt: string
  mainImage: Image
  status: string
  slug: Slug
  tags: string[] | null
}

export type Socials = {
  Facebook: string
  Instagram: string
  LinkedIn: string
  YouTube: string
  Twitter: string
}

export type Settings = {
  copyright: string
  description: string
  email: string
  logo: Image
  logoalt: Image
  phone: string
  social: Socials
  title: string
  url: string
}
