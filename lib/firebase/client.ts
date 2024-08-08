'use client'
import firebaseConfig, { apiVersion, dataset, projectId, useCdn } from "./config";
import { getApps, initializeApp, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

export class App {
  static #app: FirebaseApp
  static #firestore: Firestore
  static #storage: FirebaseStorage
  static {
    App.#app = !getApps()?.length ? initializeApp(firebaseConfig) : getApps()[0]
  }
  static get Instance() {
    if (!App.#app) {
      App.#app = !getApps()?.length ? initializeApp(firebaseConfig) : getApps()[0]
    }
    return App.#app
    }
    static get Firestore() {
    if (!App.#firestore) {
      App.#firestore = getFirestore(App.Instance)
    }
    return App.#firestore
  }
  static get Storage() {
    if (!App.#storage) {
      App.#storage = getStorage(App.Instance)
    }
    return App.#storage
  }
}

if (!projectId) {
    console.error(
      "The Sanity Project ID is not set. Check your environment variables."
    );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const fetcher = async ([query, params]) => {
  // return client ? client.fetch(query, params) : [];
};

(async () => {
  // if (client) {
  //   const data = await client.fetch(getAll);
  //   if (!data || !data.length) {
  //     console.error(
  //       "Sanity returns empty array. Are you sure the dataset is public?"
  //     );
  //   }
  // }
})();

export async function getAllPosts() {
  // if (client) {
  //   return (await client.fetch(postquery)) || [];
  // }
  return [];
}

export type Settings = {
  title: string
  description: string
  url: string
  openGraphImage: string
}

export async function getSettings() {
  // if (client) {
  //   return (await client.fetch(configQuery)) || [];
  // }
  return {} as Settings;
}

export async function getPostBySlug(slug) {
  // if (client) {
  //   return (await client.fetch(singlequery, { slug })) || {};
  // }
  return {};
}

export async function getAllPostsSlugs() {
  // if (client) {
  //   const slugs = (await client.fetch(pathquery)) || [];
  //   return slugs.map(slug => ({ slug }));
  // }
  return [];
}
// Author
export async function getAllAuthorsSlugs() {
  // if (client) {
  //   const slugs = (await client.fetch(authorsquery)) || [];
  //   return slugs.map(slug => ({ author: slug }));
  // }
  return [];
}

export async function getAuthorPostsBySlug(slug) {
  // if (client) {
  //   return (await client.fetch(postsbyauthorquery, { slug })) || {};
  // }
  return {};
}

export async function getAllAuthors() {
  // if (client) {
  //   return (await client.fetch(allauthorsquery)) || [];
  // }
  return [];
}

// Category

export async function getAllCategories() {
  // if (client) {
  //   const slugs = (await client.fetch(catpathquery)) || [];
  //   return slugs.map(slug => ({ category: slug }));
  // }
  return [];
}

export async function getPostsByCategory(slug) {
  // if (client) {
  //   return (await client.fetch(postsbycatquery, { slug })) || {};
  // }
  return {};
}

export async function getTopCategories() {
  // if (client) {
  //   return (await client.fetch(catquery)) || [];
  // }
  return [];
}

export async function getPaginatedPosts({ limit, pageIndex = 0 }) {
  // if (client) {
  //   return (
  //     (await client.fetch(paginatedquery, {
  //       pageIndex: pageIndex,
  //       limit: limit
  //     })) || []
  //   );
  // }
  return [];
}
