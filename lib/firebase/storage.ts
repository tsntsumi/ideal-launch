import 'server-only'
import { getStorage, getDownloadURL } from 'firebase-admin/storage'

export async function urlForPath(path: string): Promise<string|null> {
  const fileOf = (path: string) => {
    try {
      const b = getStorage().bucket()
      const f = b.file(path)
      return f
    } catch (e) {
      console.error('urlForPath caught bucket/file:', path,
                    'exception:', e.toString())
      return null
    }
  }

  try {
    const file = fileOf(path)
    if (!file) {
      return "/img/logo.svg"
    }
    const url = await getDownloadURL(file)
    return url
  } catch (e) {
    console.error('urlForPath caught getDownloadURL:', path,
                  'exception:', e.toString())
    return "/img/logo.svg"
  }
}
