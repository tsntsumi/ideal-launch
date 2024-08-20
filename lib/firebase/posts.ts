// import 'server-only'
// import { initAdmin } from '@/lib/firebase/admin'
// import { getStorage, getDownloadURL } from 'firebase-admin/storage'
// import {
//   getFirestore, QueryDocumentSnapshot, DocumentData, Timestamp
// } from 'firebase-admin/firestore'
// import {
//   Author, Category, Post
// } from '@/lib/firebase/types'
// import { ImageSource } from '@/lib/firebase/admin/types'
// import { urlForImage } from '@/lib/firebase/image'
// 
// const NullSlug = {
//   current: ""
// }
// 
// const NullAuthor: Author = {
//   _id: "",
//   name: "",
//   bio: "",
//   image: {
//     alt: "",
//     caption: "",
//     asset: "",
//     width: 32,
//     height: 32,
//     src: null,
//   },
//   slug: NullSlug
// }
// 
// const NullCategory: Category = {
//   _id: "",
//   color: "",
//   count: 0,
//   description: "",
//   title: "",
//   slug: NullSlug
// }
// 
async function urlForPath(bucketname: string, path: string): Promise<string> {
//   if (!bucketname || !path) {
//     return "/img/logo.svg"
//   }
//   const file = getStorage().bucket(bucketname).file(path)
//   const url = await getDownloadURL(file)
//   return url
}
// 
async function authorForSlug(slug: string) {
//   const authors = await getFirestore().collection('authors')
//                                       .where('slug.current', '==', slug).get()
//   if (authors.empty) {
//     return NullAuthor
//   }
//   const doc = authors.docs.shift()
//   if (!doc) {
//     return NullAuthor
//   }
//   const author = doc?.data() as Author
//   const image = urlForImage(author.image)
//   if (!image) {
//     return author
//   }
//   author.image = image as ImageSource
//   if (!author.image.src?.length) {
//     author.image.src = await urlForPath('images/authors', author.image.asset)
//     await doc.ref.set(author)
//   }
//   return author
}
// 
async function categoriesForNames(catnames: string[]): Promise<(Category)[]> {
//   const cc = getFirestore().collection('categories')
//   const categories = await Promise.all(catnames.map(async(cname) => {
//     const ss = await cc.where('slug.current', '==', cname).get()
//     if (ss.empty) {
//       return NullCategory
//     }
//     const doc = ss.docs[0]
//     const d = doc.data() as Category
//     d._id = doc?.id
//     return d
//   }))
//   return categories
}
// 
async function postFromDoc(
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
) : Promise<Post | null> {
//   const d = doc.data()
//   const image = urlForImage(d.mainImage)
//   if (!image) {
//   } else if (!image?.src?.length) {
//     d.mainImage = image
//     d.mainImage.src = await urlForPath('images/posts', d.mainImage.asset)
//     await doc.ref.set(d)
//   }
//   const post: Post = {
//     _id: doc.id,
//     author: await authorForSlug(d.author),
//     body: d.body,
//     categories: await categoriesForNames(d.categories),
//     createdAt: d.createdAt.toDate().toISOString(),
//     publishedAt: d.publishedAt.toDate().toISOString(),
//     mainImage: d.mainImage,
//     status: d.status,
//     slug: d.slug,
//     tags: d.tags,
//     title: d.title
//   }
//   return post
}
// 
export async function getPaginatedPosts({ limitIndex, pageIndex = 0}) {
//   await initAdmin()
//   console.debug('getPaginatedPosts pageIndex:', pageIndex, 'limitIndex:', limitIndex)
//   if (pageIndex < 0) {
//     pageIndex = 0
//   } else if (pageIndex >= limitIndex) {
//     console.error(`limitIndex (${limitIndex}) is less than pageIndex (${pageIndex})`)
//     return null
//   }
//   const params = { pageIndex, limitIndex }
//   const entries = await getFirestore().collection('posts')
//                                       .where('status', '==', 'published')
//                                       .orderBy('publishedAt', 'desc')
//                                       .orderBy('createdAt', 'desc')
//                                       .limit(limitIndex)
//                                       .get()
//   if (!entries || entries.empty) {
//     return new Response('[]', {
//       status: 403,
//       headers: { 'content-type': 'application/json' }
//     })
//   }
// 
//   const docs = entries.docs.slice(pageIndex)
//   
//   const posts = await Promise.all(docs.map(async (doc) => (
//     await postFromDoc(doc)
//   )))
// 
//   return posts
}
// 
export async function getAllPosts() {
//   await initAdmin()
//   return await getPaginatedPosts({limitIndex: 9999, pageIndex: 0})
}
// 
export async function getAllPostsSlugs() {
//   await initAdmin()
//   const posts = await getFirestore().collection('posts')
//                                     .where('status', '==', 'published')
//                                     .orderBy('publishedAt', 'desc')
//                                     .orderBy('createdAt', 'desc').get()
//   if (!posts || posts.empty) {
//     return []
//   }
//   const slugs = await Promise.all(posts.docs.map(async (p) => (
//     { slug: (await p.get('slug')?.current) || "" }
//   )))
//   return slugs
}
// 
export async function getPostBySlug(slug: string) {
//   await initAdmin()
//   const ss = getFirestore().collection('posts')
//                            .where('status', '==', 'published')
//                            .where('slug.current', '==', slug)
//                            .get()
//   if (ss.empty) {
//     return null
//   }
//   return PostFromDoc(ss.docs.at(0))
}
