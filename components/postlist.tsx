//import Image from "next/image";
import Image from '@/components/blog/image'
import Link from "next/link";
import { cx } from "@/lib/utils";
//import { urlForImage } from "@/lib/firebase/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category"
import { AuthorImageLabel } from '@/components/blog/author'

const urlForImage = (src) => (src)

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight
}) {
  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-10 md:grid-cols-2"
        )}>
        <div
          className={cx(
            " mb-4 overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800"
          )}>
          <Link
            className={cx(
              "relative block",
              aspect === "landscape"
              ? "aspect-video"
              : aspect === "custom"
              ? "aspect-[5/4]"
              : "aspect-square"
            )}
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
              post.slug
            }`}>
            <Image
              image={post.mainImage}
              {...(post.mainImage.blurDataURL && {
                placeholder: "blur",
                blurDataURL: post.mainImage.blurDataURL
              })}
              alt={post.mainImage.alt || "Thumbnail"}
              priority={preloadImage ? true : false}
              className="object-cover transition-all"
              fill
              sizes="(max-width: 768px) 30vw, 33vw"
            />
          </Link>
    </div>

    <div className={cx(minimal && "flex items-center")}>
      <div>
        <CategoryLabel
          categories={post.categories}
          nomargin={minimal}
        />
        <h2
          className={cx(
            fontSize === "large"
            ? "text-2xl"
            : minimal
            ? "text-3xl"
            : "text-lg",
            fontWeight === "normal"
            ? "line-clamp-2 font-medium  tracking-normal text-black"
            : "font-semibold leading-snug tracking-tight",
            "mt-2    dark:text-white"
          )}>
          <Link
            href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                  post.slug
                }`}>
            <span
              className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                         bg-no-repeat
                         transition-[background-size]
                         duration-500
                         hover:bg-[length:100%_3px]
                         group-hover:bg-[length:100%_10px]
                         dark:from-purple-800 dark:to-purple-900">
              {post.title}
            </span>
          </Link>
        </h2>

        <div className="hidden">
          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href={`/post/${
                      pathPrefix ? `${pathPrefix}/` : ""
                    }${post.slug}`}>
                {post.excerpt}
              </Link>
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400 gap-2">
          <Link href={`/author/${post?.author}`}>
            <div className="flex items-center gap-3">
              {/* <AuthorImageLabel id={post?.author} /> */}
            </div>
          </Link>
          <span className="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <time
            className="truncate text-sm"
            dateTime={post?.publishedAt}>
            {format(
              parseISO(
                post?.publishedAt
              ),
              "MM / dd, yyyy"
            )}
          </time>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
