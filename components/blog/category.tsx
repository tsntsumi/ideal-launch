'use client'
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'

export default function CategoryLabel({
  categories,
  nomargin = false
}: {
  categories: string[]
  nomargin?: boolean
}) {
  const firestore = useFirestore()
  const c = collection(firestore, 'categories')
  const q = query(c, where('slug', 'in', categories))
  const { status, data } = useFirestoreCollectionData(q, { idField: '_id' })
  if (status === 'loading') {
    return (
      <>
      {categories.map((category) => (
        <Label nomargin={nomargin} color={'pink'} key={category}>{category}</Label>
      ))}
      </>
    )
  }
  

  return (
    <div className="flex gap-3">
      {data.map((category) => (
        <Label nomargin={nomargin} color={category.color} key={category._id}>{category.title}</Label>
      )) }
    </div>
  );
}
