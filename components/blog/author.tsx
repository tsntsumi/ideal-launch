import Image from './image'
import Link from "next/link";
import { ArrowPathIcon, PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Label from "@/components/ui/label";
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'

export function AuthorImage({ id, sizes, className = "", fill = false }: {
  id: string
  sizes: string
  className?: stirng
  fill?: boolean
}) {
  const firestore = useFirestore()
  const c = collection(firestore, 'authors')
  const q = query(c, where('slug', '==', id))
  const { status, data: authors } = useFirestoreCollectionData(q, { idField: '_id' })
  if (status === 'loading') {
    return (
      <UserCircleIcon className={className} sizes={sizes} />
    )
  }
  return (
    <>
    {authors.map((author) => (
      <Image key={author} image={author.image} alt={author.name} sizes={sizes} />
    ))}
    </>
  )
}

export function AuthorLabel({ id }: { id: string }) {
  const firestore = useFirestore()
  const authorsCollection = collection(firestore, 'authors')
  const q = query(authorsCollection, where('slug', '==', id))
  const { status, data: authors } = useFirestoreCollectionData(q, {idField: '_id'})
  if (status === 'loading') {
    return (<><span>{id}...</span><ArrowPathIcon className="w-[20px] inline" /></>)
  }
  return (<>{
    authors.map((author) => (
      <div>
      <span key={author._id}>{author.name}</span>
      </div>
    ))
  }</>)
}

export function AuthorDescription({ id }: { id: string }) {
  const firestore = useFirestore()
  const authorsCollection = collection(firestore, 'authors')
  const q = query(authorsCollection, where('slug', '==', id))
  const { status, data: authors } = useFirestoreCollectionData(q, {idField: '_id'})
  if (status === 'loading') {
    return (<><span>{id}...</span><ArrowPathIcon className="w-[20px] inline" /></>)
  }
  return (<>{
    authors.map((author) => (
      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
        <span key={author._id}>{author.name}</span>
        </h3>
        <p className="text-justify">{author.bio}</p>
      </div>
    ))
  }</>)
}

export function AuthorImageLabel({ id }: { id: string }) {
  const firestore = useFirestore()
  const authorsCollection = collection(firestore, 'authors')
  const q = query(authorsCollection, where('slug', '==', id))
  const { status, data: authors } = useFirestoreCollectionData(q, {idField: '_id'})
  if (status === 'loading') {
    return (<><span>{id}...</span><ArrowPathIcon className="w-[20px] inline" /></>)
  }
  return (<>{
    authors.map((author) => (
      <div key={author._id}>
        <Image image={author.image} alt={author.name} fill sizes="20px" />
        <span className="truncate text-sm">
          {author.name}
        </span>
      </div>        
    ))
  }</>)
}

export type Author = {
  bio: string
  image: {
    alt: string
    asset: string
    caption: string
    height: number
    src: string
    width: number
  }
  name: string
  slug: { current: string }
}

export function AuthorCard({ id }: { id: string }) {
  return (
    <div className="mt-3 rounded-2xl bg-gray-50 px-8 py-8 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="relative mt-1 h-24 w-24 flex-shrink-0 ">
          <Link href={`/author/${id}`}>
            <AuthorImage
              id={id}
              className="rounded-full object-cover"
              fill
              sizes="96px"
            />
          </Link>
        </div>
        <div>
          <div className="mb-3">
            <AuthorDescription id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
