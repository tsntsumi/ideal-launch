import { getFirestore } from 'firebase-admin/firestore'
import { urlForPath } from '@/lib/firebase/storage'
import type { Settings } from '@/lib/firebase/admin/types'

export async function getSettings(): Settings {
  const ss = await getFirestore().doc('settings/site').get()
  if (!ss.exists) {
    return null
  }
  const d = ss.data()
  d.logo.src = await urlForPath(d.logo.asset) || "/img/logo.svg"
  d.logoalt.src = await urlForPath(d.logoalt.asset) || "/img/logo.svg"
  const r = ss.ref
  await r.set(d)
  return d
}
