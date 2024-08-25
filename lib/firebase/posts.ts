import 'server-only'
import { getFirestore, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { urlForImage } from '@/lib/firebase/image'
import { urlForPath } from '@/lib/firebase/storage'
import { Image, Author, Category, Post,
         NullSlug, NullAuthor, NullCategory } from '@/lib/firebase/types'


// async function urlForPath(bucketname: string, path: string): Promise<string> {
//   if (!bucketname || !path) {
//     return "/img/logo.svg"
//   }
//   const file = getStorage().bucket(bucketname).file(path)
//   const url = await getDownloadURL(file)
//   return url
// }

async function authorForSlug(slug: string) {
  const authors = await getFirestore().collection('authors')
                                      .where('slug.current', '==', slug).get()
  if (authors.empty) {
    return NullAuthor
  }
  const doc = authors.docs.shift()
  if (!doc) {
    return NullAuthor
  }
  const author = doc?.data() as Author
  const image = urlForImage(author.image)
  if (!image) {
    return author
  }
  author.image = image as Image
  if (!author.image.src?.length) {
    author.image.src = await urlForPath(author.image.asset)
    await doc.ref.set(author)
  }
  return author
}
// 
async function categoriesForNames(catnames: string[]): Promise<(Category)[]> {
  const cc = getFirestore().collection('categories')
  const categories = await Promise.all(catnames.map(async(cname) => {
    const ss = await cc.where('slug.current', '==', cname).get()
    if (ss.empty) {
      return NullCategory
    }
    const doc = ss.docs[0]
    const d = doc.data() as Category
    d._id = doc?.id
    return d
  }))
  return categories
}

async function postFromDoc(
  doc
) : Promise<Post | null> {
  const d = doc.data()
  const image = urlForImage(d.mainImage)
  if (!image) {
    console.warn('postFromDoc urlForImage returned null')
  } else {
    d.mainImage = image
    const url = await urlForPath(d.mainImage.asset)
    d.mainImage.src = url
    await doc.ref.set(d)
  }
  const post: Post = {
    _id: doc.id,
    author: await authorForSlug(d.author),
    body: d.body,
    categories: await categoriesForNames(d.categories),
    createdAt: d.createdAt.toDate().toISOString(),
    publishedAt: d.publishedAt.toDate().toISOString(),
    mainImage: d.mainImage,
    status: d.status,
    slug: d.slug,
    tags: d.tags,
    title: d.title
  }
  return post
}

export async function getPaginatedPosts({ limitIndex, pageIndex = 0}) {
  if (pageIndex < 0) {
    pageIndex = 0
  } else if (pageIndex >= limitIndex) {
    console.error(`limitIndex (${limitIndex}) is less than pageIndex (${pageIndex})`)
    return null
  }
  const entries = await getFirestore().collection('posts')
                                      .where('status', '==', 'published')
                                      .orderBy('publishedAt', 'desc')
                                      .orderBy('createdAt', 'desc')
                                      .limit(limitIndex)
                                      .get()
  if (!entries || entries.empty) {
    return null
  }
  
  const docs = entries.docs?.slice(pageIndex)
  
  const posts = await Promise.all(docs.map(async (doc) => (
    await postFromDoc(doc)
  )))
  
  return posts
}

export async function getAllPosts() {
  return await getPaginatedPosts({limitIndex: 9999, pageIndex: 0})
}

export async function getAllPostsSlugs() {
  const posts = await getFirestore().collection('posts')
                                    .where('status', '==', 'published')
                                    .orderBy('publishedAt', 'desc')
                                    .orderBy('createdAt', 'desc')
                                    .get()
  if (!posts || posts.empty) {
    return []
  }

  const slugs = posts.docs.map((e) => (
    { slug: e.get('slug.current') || "not-found" }
  ))

  return slugs
}

export async function getPostBySlug(slug: string) {
  const ss = await getFirestore().collection('posts')
                                 .where('status', '==', 'published')
                                 .where('slug.current', '==', slug)
                                 .limit(1)
                                 .get()
  if (!ss || ss.empty) {
    return null
  }

  const posts = await Promise.all(ss.docs.map(async (doc) => await postFromDoc(doc)))

  return posts[0]
}
