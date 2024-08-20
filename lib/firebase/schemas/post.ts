import { DocumentReference, Timestamp } from 'firebase/firestore'
import { Image } from './image'

export type Post = {
  title: string  // Title
  slug: { current: string; }
  excerpt: string // The excerpt is used in blog feeds, and also for search results
  author: DocumentReference
  mainImage: Image
  categories: DocumentReference[]
  publishedAt: Timestamp
  createdAt: Timestamp
  status: "published" | "draft"
  body: string[]
}
