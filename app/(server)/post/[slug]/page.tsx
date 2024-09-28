import PostPage from "./default";
import { notFound } from "next/navigation";
import { initAdmin } from '@/lib/firebase-admin'
import { getFirestore, QuerySnapshot } from 'firebase-admin/firestore'
import { stringFromTimestamp } from '@/lib/utils'
//import PostBySlug from './post'

const getAllPosts = async (): Promise<QuerySnapshot> => {
  await initAdmin()
  const firestore = getFirestore()
  const ss = await firestore.collection('posts')
                            .where('status', '==', 'published')
                            .orderBy('publishedAt', 'desc')
                            .get()
  return ss 
}

const getPostBySlug = async (slug: string): Promise<any> => {
  await initAdmin()
  const firestore = getFirestore()
  const ss = await firestore.collection('posts')
                            .where('status', '==', 'published')
                            .where('slug', '==', slug)
                            .get()
  if (!ss || ss.empty) {
    return null
  }
  const doc = ss.docs[0]
  const post = doc.data()
  post._id = doc.id
  return post
}

export async function generateStaticParams() {
  const ss = await getAllPosts()
  if (!ss || ss.empty) {
    return []
  }
  const slugs = ss.docs.map((doc) => {
    const d = doc.data()
    return d.slug
  })
  return slugs
}

export async function generateMetadata({ params }: { params: any }) {
  const post = await getPostBySlug(params.slug)
  return { title: post?.title, description: post?.description };
}

export default async function PostDefault({ params }: { params: any }) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return (<></>)
  }
  post.createdAt = stringFromTimestamp(post?.createdAt)
  post.publishedAt = stringFromTimestamp(post?.publishedAt)
  return (<PostPage post={post} />)
}

// export const revalidate = 60;
