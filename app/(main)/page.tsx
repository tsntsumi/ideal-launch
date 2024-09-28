import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto space-y-6 text-sm">
      <div className="flex flex-col items-center">
        <div>プログラマって...</div>
        <Badge>もっと自由で、創造的で、先進的な仕事かと思っていた...</Badge>
      </div>
      <h1>憧れてなったのに、こんなはずじゃあ...と後悔していませんか？</h1>
      <p>
        それでも、プログラミング自体は面白いし、
        クライアントは喜んでくれてるし、
        そこそこ給料はもらえるから、
        今すぐやめたいってわけじゃない。
      </p>
      <h2>嫌々仕事をしていて、幸せを感じてますか？</h2>
      <p>嫌な仕事をしていても、プライベートで幸福感を得ることはできます。</p>
      <p>プライベートが幸せならそれでいい、そもそも仕事が楽しいはずがない、
        みんな我慢してやっている。仕事は辛いもの...</p>
      <p>もし、そんなふうに思い込んでいるのなら、それは常識に洗脳されています。</p>
      <h2>仕事が楽しくなかったら、人生で充実感を味わうことはできません</h2>
      
    </section>
  )
}
