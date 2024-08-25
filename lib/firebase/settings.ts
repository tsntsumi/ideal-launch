import { getFirestore } from 'firebase-admin/firestore'
import { urlForPath } from '@/lib/firebase/storage'
import { Settings, NullSettings } from '@/lib/firebase/types'

export async function getSettings(): Promise<Settings | null> {
  const ss = await getFirestore().doc('settings/site').get()
  if (!ss || !ss.exists) {
    return null
  }
  const d = ss?.data() as Settings || NullSettings
  d.logo.src = await urlForPath(d.logo.asset) || "/img/logo.svg"
  d.logoalt.src = await urlForPath(d.logoalt.asset) || "/img/logo.svg"
  const r = ss.ref
  await r.set(d)
  return d
}

