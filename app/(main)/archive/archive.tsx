'use client'
import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";
import { useFirestore, useFirestoreCollectionData,
         useStorage, useStorageDownloadURL } from 'reactfire'
import { collection, query, where, limit, orderBy } from 'firebase/firestore'
import { stringFromTimestamp } from '@/lib/utils'

function getPaginatedPosts(params: any) {
  const from = params.pageIndex
  const to = params.limit

  const firestore = useFirestore()
  const c = collection(firestore, 'posts')
  const q = query(c, where('status', '==', 'published'),
                  orderBy('publishedAt', 'desc'))
  const { status, data } = useFirestoreCollectionData(q, { idField: '_id' })
  if (status === 'loading') {
    return []
  }
  const posts = data.slice(from, to).map((doc, i) => {
    doc.publishedAt = stringFromTimestamp(doc.publishedAt)
    return doc
  })
  return posts
}

export default function Post({ searchParams }: { searchParams: any }) {
  // Fetch the current page from the query parameters, defaulting to 1 if it doesn't exist
  const page = searchParams.page;
  const pageIndex = parseInt(page, 10) || 1;

  // Set the number of posts to be displayed per page
  const POSTS_PER_PAGE = 6;

  // Define the parameters for fetching posts based on the current page
  const params = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE
  };

  const posts = getPaginatedPosts(params);

  if (!posts?.length) {
    return <div className="flex items-center justify-center">Loading...</div>
  }

  // Check if the current page is the first or the last
  const isFirstPage = pageIndex < 2;
  const isLastPage = posts.length < POSTS_PER_PAGE;

  return (
    <>
      {posts && posts?.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">
            End of the result!
          </span>
        </div>
      )}
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="square" />
        ))}
      </div>

    <Pagination
      pageIndex={pageIndex}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
    </>
  );
}
