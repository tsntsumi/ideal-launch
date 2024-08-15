export type SiteSettings = {
  title: string
  url: string
  copyright: string // Enter company name to appear in footer after ©"
  logo: string
  email: string // Support Email
  emailPattern: string // "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  phone: string | undefined // Support Phone
  w3ckey: string | undefined // "Web3Forms Access Key",
  social: {
    twitter: string | undefined
    Facebook: string | undefined
    Instagram: string | undefined
    LinkedIn: string | undefined
    YouTube: string | undefined
  }
  description: string // Meta Description
}
