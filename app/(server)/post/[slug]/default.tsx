'use client'
import Link from "next/link";
import { AuthorLabel, AuthorCard, AuthorMiniCard } from "@/components/blog/author";
import Image from '@/components/blog/image'
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar/navbar";
import { ReactNode } from "react";
import MyFirebaseProvider from "@/components/firebase-providers";
import Container from "@/components/container";
import CategoryLabel from "@/components/blog/category";
import { parseISO, format } from "date-fns";
import BodyContent, {Summary} from '@/components/blog/bodycontents'
import { Toaster } from "@/components/ui/toaster";

function PostPage(props) {
  const { loading, post } = props
  if (!loading && !post) {
    return notFound()
  }
  return (
    <div>
      <Container className="!pt-0">
        <>
          <div className="mx-auto max-w-screen-md ">
            <div className="flex justify-center">
              <CategoryLabel categories={post.categories} />
            </div>
            <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
              {post.title}
            </h1>
          </div>
          <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
            <Link href={`/author/${post.author.slug}`}>
              <Image
                src={post?.author?.image?.src}
                alt={post?.author?.name}
                className="rounded-full object-cover"
                fill
                sizes="40px"
              />
            </Link>
          </div>
          <div>
            <p className="text-gray-800 dark:text-gray-400">
              <Link href={`/author/${post.author.slug}`}>
                {post.author.name}
              </Link>
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <time
              className="text-gray-500 dark:text-gray-400"
              dateTime={post?.publishedAt}>
              {format(
                parseISO(post?.publishedAt),
                "MM / dd, yyyy"
              )}
            </time>
            <span>· {post.estReadingTime || "5"} min read</span>
          </div>
        </>
      </Container>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        <Image image={post.mainImage}
               alt={post.mainImage?.alt || "Thumbnail"}
               loading="eager"
               fill
               sizes="100vw"
               className="object-cover"
        />
      </div>

      <Container>
        <article className="mx-auto max-w-screen-md ">
          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
            <Summary>{post.excerpt}</Summary>
            <BodyContent contents={post.body} />
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href="/archive"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
              ← すべての記事へ
            </Link>
          </div>
          <AuthorCard id={post.author} />
        </article>
      </Container>
    </div>
  )
}

export default function Page(props) {
  return (
    <div className="flex flex-col min-h-screen animate-in fade-in">
      <NavBar />
      <div className="flex flex-col grow h-full">
        <PostPage {...props} />
        <Toaster />
      </div>
      <Footer />
    </div>
  )
}
