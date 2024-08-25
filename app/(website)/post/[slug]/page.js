import PostPage from "./default";
import { initAdmin } from "@/lib/firebase/admin"
import { getAllPostsSlugs, getPostBySlug } from "@/lib/firebase/posts";

export async function generateStaticParams() {
  await initAdmin()
  const posts = await getAllPostsSlugs()
  return posts
}

export async function generateMetadata({ params }) {
  await initAdmin()
  const post = await getPostBySlug(params.slug);
  return { title: post.title }
}

export default async function PostDefault({ params }) {
  await initAdmin()
  const post = await getPostBySlug(params.slug);
  return <PostPage post={post} />;
}

// export const revalidate = 60;
