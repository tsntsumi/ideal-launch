import { Suspense } from "react";
import { initAdmin } from "@/lib/firebase/admin"
import Container from "@/components/container";
import Archive from "./archive";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";

// export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
  await initAdmin()
  return (
    <>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          書庫
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg">
            これまでに書いたすべての記事をお読みください
          </p>
        </div>
        <Suspense
          key={searchParams.page || "1"}
          fallback={<Loading />}>
          <Archive searchParams={searchParams} />
        </Suspense>
      </Container>
        これまでに書いた記事です。お楽しみください。
    </>
  );
}

// export const revalidate = 60;
