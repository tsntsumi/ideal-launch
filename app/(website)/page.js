import HomePage from "./home";
import { initAdmin } from "@/lib/firebase/admin"
import { getAllPosts } from '@/lib/firebase/posts' 

export default async function IndexPage() {
  await initAdmin()
  const posts = await getAllPosts();
  return <HomePage posts={posts} />;
}

// export const revalidate = 60;
