import 'server-only'
import { getFirestore, DocumentSnapshot } from 'firebase-admin/firestore'
import { Author } from '@/lib/firebase/types'

const NullAuthor: Author = {
  _id: "",
  name: "",
  bio: "",
  image: {
    alt: "",
    caption: "",
    asset: "",
    width: 32,
    height: 32,
    src: null,
  },
  slug: { current: "" }
}

export async function authorFromDoc(doc: DocumentSnapshot<Author>): Promise<Author> {
  // const author = doc.data()
  // author._id = doc.id
  // const image = urlForImage(author.image)
  // if (!image) {
  //   return author
  // }
  // author.image = image
  // if (!author.image?.src?.length) {
  //   author.image.src = await getStorage().ref(author.image.asset).getDownloadURL()
  //   await doc.set(author)
  // }
  return NullAuthor
}

export async function getAllAuthors() {
  // await initAdmin()
  // const ss = await getFirestore().collection('authors').get()
  // if (ss.empty) {
  //   return null
  // }
  // return await Promise.all(ss.docs.map(async (doc) => (
  //   await authorFromDoc(doc))
  // ))
}
