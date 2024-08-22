import 'server-only'
import { getStorage, getDownloadURL, File } from 'firebase-admin/storage'

export async function urlForPath(path: string): Promise<File> {
  const fileOf = (path: string): File => {
    try {
      const b = getStorage().bucket()
      const f = b.file(path)
      return f
    } catch (e) {
      console.error('urlForPath caught bucket/file:', path,
                    'exception:', e.toString())
      return "/img/logo.svg"
    }
  }

  try {
    const file = fileOf(path)
    if (!file) {
      return null
    }
    const url = await getDownloadURL(file)
    return url
  } catch (e) {
    console.error('urlForPath caught getDownloadURL:', path,
                  'exception:', e.toString())
    return "/img/logo.svg"
  }
}
