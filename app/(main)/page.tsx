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
    <>
      <div className="grow flex flex-col items-center justify-evenly">
        <section className="space-y-6">
          <div className="container flex flex-col items-center gap-8 text-center">
            <Badge className="space-x-4 font-normal text-sm bg-pink-600">
              プログラマーって、もっと自由で創造的な仕事かと思っていた...
            </Badge>
    <h1 className="max-w-4xl font-heading font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
      憧れていた仕事だったのに、こんなはずじゃなかったと後悔しているプログラマーのあなたへ
    </h1>
    <div className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      <p>
      それでも、プログラミング自体は面白いし、
      クライアントは喜んでくれるし、
      そこそこ給料はいいから、
      今すぐやめたいってわけじゃない。
    </p>
    <p className="mt-4">
      でも、人間関係がうまくいってなかったり、
      仕事のやり方に不満があったりして、嫌々仕事をしていませんか？
    </p>
    </div>
    <div className="space-x-4">
      <Link href="/login">
        <Button size="lg">Call to Action!</Button>
      </Link>
    </div>
    </div>
    </section>
    <section className="container mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-center">
        <div>
          <Card className=" shadow-orange-200 shadow-md border-orange-400">
            <CardHeader>
              <CardTitle>毒上司と折り合いをつけて、平穏に仕事をする方法を知りたいですか？</CardTitle>
              <CardDescription>
                楽しく仕事をしたいとまでは言わないけど、平穏に仕事をこなしていければいいと思っているなら、私たちのメソッドをチェックしてみてください。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                アリザ・アイデアルの堤紀久夫は、こんなに面白くて、
                自分に合っている仕事はないと胸を躍らせて、人工知能プログラマーの仕事を選びました。
                入社後すぐに派遣された研究所では、人工知能システムの開発を行い、
                上司や先輩にも恵まれ、楽しく仕事をこなしていました。
                時には深夜まで残業することもありましたが、辛いと思ったことはありませんでした。
              </p>
              <p>
                しかし、転機が訪れたのは、２年間の派遣期間が過ぎ、地方にある本社に帰任してからでした。
                そこには、毒上司や毒先輩たちが跋扈していたのです。わたしはたちまち神経性胃炎になりました。
              </p>
              <p>
                しかし、それは予兆に過ぎませんでした。それから何年か過ぎたあとのことです。
                わたしはそれから抑うつ状態になり、休職せざるを得なくなったのです・・・。
              </p>
              <p>それから１０年間闘病し、復職することに成功し、１２年以上平穏に過ごすことができました。</p>
              <Link
                className={cn(
                  buttonVariants({ variant: "orange", size: "xl" }),
                  "mt-4 w-full"
                )}
                href="https://enesien.com?utm_source=venefish"
              >
                その秘訣を知る...
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    </div>
    </>
  );
}
