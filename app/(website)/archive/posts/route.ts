import 'server-only'

import { type NextRequest, NextResponse } from 'next/server'
import { getFirestore, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { getStorage, getDownloadURL } from 'firebase-admin/storage'
import { urlForImage } from '@/lib/firebase/image'
import { initAdmin } from '@/lib/firebase/admin'

const dateFromTimestamp = (ts) => (new Date(ts.seconds * 1000))

async function downloadURL(path: string) {
  try {
    const bucket = getStorage().bucket('image/posts')
    const file = bucket.file(path)
    return await getDownloadURL(file) || '/img/logo.svg'
  } catch (e) {
    console.error('downloadURL bucket.file(', path, ')', e.toString())
    return '/img/logo.svg'
  }
}

async function authorFromDoc(doc: QueryDocumentSnapshot | undefined) {
  if (!doc?.exists) {
    return null
  }
  const author = doc.data()
  author.image = urlForImage(author.image)
  author.image.src = await downloadURL(author.image.asset)
  return author
}

async function getAuthor(slug: string) {
  const authors = await getFirestore().collection('authors')
                                 .where('current', '==', slug).get()
  if (authors.empty) {
    return null
  }
  return await authorFromDoc(authors.docs?.shift())
}

async function getCategories(slugs: string[]) {
  const categories = await Promise.all(
    slugs.map(async (slug) => {
      const css = await getFirestore().collection('categories')
                                      .where('slug.current', '==', slug).get()
      return css.docs?.shift()?.data()
    }))
  return categories
}

async function postFromDoc(doc: QueryDocumentSnapshot) {
  if (!doc?.exists) {
    return null
  }
  const post = doc.data()
  post._id = doc.id
  post.author = await getAuthor(post.author)
  post.categories = await getCategories(post.categories)
  post.mainImage = urlForImage(post.mainImage)
  post.mainImage.src = await downloadURL(post.mainImage.asset)

  post.createdAt = dateFromTimestamp(post.createdAt).toISOString()
  post.publishedAt = dateFromTimestamp(post.publishedAt).toISOString()

  return post
}

export async function POST(request: NextRequest) {
  await initAdmin()

  const requestParams = await request.json()
  const { pageIndex, limitIndex } = requestParams
  const responseHeaders = { 'content-type': 'application/json' }

  const entries = await getFirestore().collection('posts')
                                 .where('status', '==', 'published')
                                 .orderBy('publishedAt', 'desc')
                                 .orderBy('createdAt', 'desc')
                                 .limit(limitIndex)
                                 .get()
  if (!entries || entries.empty) {
    return new Response('[]', { status: 403, headers: responseHeaders, })
  }

  const docs = entries.docs.slice(pageIndex)
  
  const posts = await Promise.all(docs.map(async (doc) => {
    return await postFromDoc(doc)
  }, []))

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: responseHeaders,
  })
}
