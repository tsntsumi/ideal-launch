import "server-only"
import { initAdmin } from '@/lib/firebase/admin'

export async function getPaginatedPosts({ limitIndex, pageIndex = 0}) {
  await initAdmin()
  console.debug('getPaginatedPosts pageIndex:', pageIndex, 'limitIndex:', limitIndex)
  if (pageIndex < 0) {
    pageIndex = 0
  } else if (pageIndex >= limitIndex) {
    console.error(`limitIndex (${limitIndex}) is less than pageIndex (${pageIndex})`)
    return null
  }
  const params = { pageIndex, limitIndex }
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

  return posts
}
