import Image from "@/components/blog/image"
import { parseISO, format } from "date-fns";
import { cx } from "@/utils/all";
import Link from "next/link";

export default function Featured({ post, pathPrefix }) {
  return (
    <div className="">
      <div>
        <Link>
          <Image image={post?.mainImage} />
        </Link>
      </div>
    </div>
  )
}
