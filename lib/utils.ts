export const cx = (...classNames) =>
  classNames.filter(Boolean).join(" ");

// because we use sanity-next-image
// vercel throws error when using normal imports
export const myLoader = ({ src }) => {
  return src;
};

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isBrowser = () => typeof window !== "undefined"

export const stringFromTimestamp = (ts: any) => {
  if (!ts) {
    return '2024-09-28'
  }
  if (typeof ts === 'string') {
    return ts
  }
  return Object.hasOwn(ts, 'seconds') ? new Date(ts.seconds * 1000).toISOString() : '2024-09-28'
}
