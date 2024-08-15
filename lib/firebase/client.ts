import { getFirestore, Firestore, collection, doc, limit,
         getDoc, getDocs, setDoc, where, orderBy, query,
         Query, DocumentReference, CollectionReference
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { urlForImage, urlForImageAsync } from './image'
import { initializeApp } from 'firebase/app'
import app from './config'

const firestore = !app ? null : getFirestore(app)
const storage = !app ? null : getStorage(app)

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const fetcher = async ([query, params]) => {
  // return client ? client.fetch(query, params) : [];
  return fetchQuery(query) || []
};

async function getAll() {
  if (!firestore) {
    return []
  }
  const settings = doc(firestore, "settings", "site")
  const settingsss = await getDoc(settings)
  if (!settingsss.exists()) {
    console.error('Firestore returns empty doc. Are you sure the dataset is public?')
    await addSiteSetting(settings)
  }
  const blog = createCollection('posts')
  const posts = await fetchQuery(blog)
  if (!posts?.length) {
    console.error(
      "Firestore returns empty array. Are you sure the dataset is public?"
    )
  }
  return []
}

async function addSiteSetting(siteref) {
  const data = {
    title: process.env.SITE_TITLE,
    url: process.env.SITE_URL,
    copyright: process.env.COPYRIGHT,
    logo: process.env.LOGO,
    email: process.env.EMAIL,
    phone: process.env.PHONE,
    social: {
      twitter: process.env.TWITTER,
      Facebook: process.env.FACEBOOK,
      Instagram: process.env.INSTAGRAM,
      LinkedIn: process.env.LINKEDIN,
      YouTube: process.env.YOUTUBE
    },
    description: process.env.DESCRIPTION
  }
  await setDoc(siteref, data)
}

(async () => {
  if (firestore) {
    const posts = await getAll()
  }
})();

function createCollection(root) {
  if (!firestore) {
    return null
  }
  return collection(firestore, root)
}

function createQuery(col, ...queries) {
  const c = (typeof col === 'string') ? createCollection(col) : col
  if (!c) {
    return null
  }
  return queries?.reduce((acc, crr) => query(acc, crr), c)
}

async function fetchQuery(q: Query | CollectionReference | null) {
  try {
    if (!q) {
      return null
    }
    const ss = await getDocs(q)
    if (ss.empty) {
      console.error(
        "Firestore returns empty array. Are you sure the dataset is public?"
      )
      return null
    }
    return await Promise.all(ss.docs.map(async (doc) => {
      const d = doc.data()
      d._id = doc.id
      return d
    }))
  } catch (e) {
    console.error('fetchQuery', e.toString())
    throw e
  }
  return null
}

async function fetchDocument(r: DocumentReference) {
  try {
    const ss = await getDoc(r)
    if (!ss.exists()) {
      console.error(
        "Firestore returns empty doc. Are you sure the dataset is public?"
      )
      return null
    }
    return ss.data()
  } catch (e) {
    console.error('fetchDocument', e.toString())
    throw e
  }
  return null
}

const dateFromTimestamp = (ts) => (new Date(ts.seconds * 1000))

export async function postFromDoc(d) {
  const post = d
  const aq = createQuery('authors',
                         where('slug.current', '==', d.author))
  const authors = await fetchQuery(aq)
  if (!!authors?.length) {
    post.author = authors?.shift()
  }
  if (!!post.author.image) {
    post.author.image = await urlForImageAsync(post.author.image)
  }

  const cq = createQuery('categories',
                         where('slug.current', '==', d.categories))
  post.categories = await fetchQuery(cq) || []

  post.mainImage = await urlForImageAsync(d.mainImage)
  post.createdAt = dateFromTimestamp(d.createdAt).toISOString()
  post.publishedAt = dateFromTimestamp(d.publishedAt).toISOString()
  return post
}

export async function fetchPosts(q) {
  try {
    if (!q) {
      return null
    }      
    const ss = await getDocs(q)
    if (ss.empty) {
      console.error(
        "Firestore returns empty array. Are you sure the dataset is public?"
      )
      return null
    }
    return await Promise.all(ss.docs.map(async (doc) => {
      const d = await postFromDoc(doc.data())
      d._id = doc.id
      return d
    }))
  } catch (e) {
    console.error('fetchPosts exception', e.toString())
    throw e
  }
  return null
}

export async function getAllPosts() {
  return getPaginatedPosts({limitIndex: 9999, pageIndex: 0})
}

export async function getSettings() {
  if (!firestore || !storage) {
    return null
  }
  try {
    const r = doc(firestore, "settings", "site")
    const d = await fetchDocument(r)
    if (!d) {
      return null
    }
    const lr = ref(storage, d?.logo.asset)
    const lar = ref(storage, d?.logoalt.asset)
    const settings = d
    settings.logo.src = await getDownloadURL(lr)
    settings.logoalt.src = await getDownloadURL(lar)
    return settings
  } catch (e) {
    console.error('getSettings fetchDocument settings/site')
    return null
  }
}

function createPublishedPostsQuery(...queries) {
  const q = createQuery('posts',
                        ...queries,
                        where('status', '==', 'published'),
                        orderBy('publishedAt', 'desc'),
                        orderBy('createdAt', 'desc'))
  return q
}
  
export async function getPostBySlug(slug) {
  const q = createPublishedPostsQuery(
    where("slug.current", '==', slug))
  const posts = (await fetchPosts(q)) || []
  const post = posts?.shift()
  return post || {}
}

export async function getAllPostsSlugs() {
  const posts = (await fetchQuery(createPublishedPostsQuery())) || []
  const slugs = posts?.map((p) => ({ slug: p.slug.current }))
  return slugs || [];
}
// Author
export async function getAllAuthorsSlugs() {
  // if (client) {
  //   const slugs = (await client.fetch(authorsquery)) || [];
  //   return slugs.map(slug => ({ author: slug }));
  // }
  const q = createQuery('authors')
  const slugs = (await fetchQuery(q)) || []
  return slugs.map(slug => ({ author: slug }));
}

export async function getAuthorPostsBySlug(slug) {
  const q = createPublishedPostsQuery(
    where('author', '==', slug.current))
  return (await fetchPosts(q)) || []
}

export async function getAllAuthors() {
  // if (client) {
  //   return (await client.fetch(allauthorsquery)) || [];
  // }
  if (!storage) {
    return []
  }
  const q = createQuery('authors')
  const authors = (await fetchQuery(q)) || []
  return await Promise.all(authors.map(async (a) => {
    const r = ref(storage, a.image.asset)
    a.image.src = await getDownloadURL(r)
    return a
  }))
}

// Category

export async function getAllCategories() {
  const q = createQuery('categories')
  const categories = (await fetchQuery(q)) || []
  return categories.map((c) => ({ category: c.slug }))
}

export async function getPostsByCategory(slug) {
  const q = createPublishedPostsQuery(
    where("slug.current", '==', slug.current))
  const posts = (await fetchPosts(q)) || []
  return posts
}

export async function getTopCategories() {
  const q = createQuery('categories', orderBy('count', 'desc'), limit(5))
  return (await fetchQuery(q)) || []
}

export async function getPaginatedPosts({ limitIndex, pageIndex = 0}) {
  console.debug('getPaginatedPosts pageIndex:', pageIndex, 'limitIndex:', limitIndex)
  if (pageIndex < 0) {
    pageIndex = 0
  } else if (pageIndex >= limitIndex) {
    console.error(`limitIndex (${limitIndex}) is less than pageIndex (${pageIndex})`)
    return null
  }
  const params = { pageIndex, limitIndex }
  const body = JSON.stringify(params, null, 2)
  const siteURL = process.env.SITE_URL || 'http://localhost:3000'
  console.debug('SITE_URL =', siteURL)
  if (!!process.env.DEPLOY) {
    console.debug('deployment...')
    return null
  }
  const data = await fetch(`${siteURL}/archive/posts`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body
  })
  if (!data) {
    console.error('/archive/posts returned null, getPaginatedPosts returns []')
    return null
  }
  return await data.json()
}
