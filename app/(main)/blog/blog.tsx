import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import { useFirestore, useFirestoreCollectionData,
         useStorage, useStorageDownloadURL } from 'reactfire'
import { collection, query, where, limit, orderBy } from 'firebase/firestore'
import Loading from "@/components/loading";
import { stringFromTimestamp } from '@/lib/utils'

export default function BlogPage() {
  const firestore = useFirestore()
  const c = collection(firestore, 'posts')
  const q = query(c, where('status', '==', 'published'),
                  orderBy('publishedAt', 'desc'))
  const { status, data } = useFirestoreCollectionData(q, { idField: '_id' })
  if (!data?.length) {
    return <Loading /> // <div className="flex items-center justify-center">Loading...</div>
  }
  const posts = data.map((doc) => {
    doc.publishedAt = stringFromTimestamp(doc.publishedAt)
    return doc
  })
  
  return (
    <Container className="!pt-0">
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
        {posts.slice(0, 2).map((post) => (
          <PostList key={post._id} post={post} aspect="landscape" preloadImage={true}
                    minimal={false} pathPrefix="" fontSize="normal" fontWeight="normal" />
        ))}
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
        {posts.slice(2, 14).map((post) => (
          <PostList key={post._id} post={post} aspect="square" preloadImage={true}
                    minimal={false} pathPrefix="" fontSize="normal" fontWeight="normal" />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          href="/archive"
          className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
          <span>すべての記事へ</span>
        </Link>
      </div>
    </Container>
  )
}
