import { getStorage, getDownloadURL } from 'firebase-admin/storage'

export async function urlForPath(path: string) {
  const fileOf = (path: string): File => {
    try {
      const f = getStorage().bucket().file(path)
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
      return null
    }
    const url = await getDownloadURL(file)
    return url
  } catch (e) {
    console.error('urlForPath caught getDownloadURL:', path,
                  'exception:', e.toString())
    return null
  }
}
