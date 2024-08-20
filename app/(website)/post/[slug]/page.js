import PostPage from "./default";
import { initAdmin } from "@/lib/firebase/admin"
import { getAllPostsSlugs, getPostBySlug } from "@/lib/firebase/posts";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return post
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  return <PostPage post={post} />;
}

// export const revalidate = 60;
