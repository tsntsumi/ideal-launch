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
        クライアントは喜んでくれてるし、
        そこそこ給料はいいから、
        今すぐやめたいってわけじゃない。
      </p>
      <p className="mt-4">
        でも、毒上司と人間関係がうまくいってなかったり、
        仕事のやり方に不満があったり、
        興味の持てないプロジェクトばかりで、
        嫌々仕事をしていませんか？
      </p>
      <p>嫌々仕事をしていても、プライベートでは幸福感を得られます。</p>
      <p>しかし、人生での充実感は得られません。</p>
      <p>充実感を感じられてこそ、幸福感を最大にすることができます。</p>
    </div>
    <div className="space-x-4">
      <Link href="/blog">
        <Button size="lg">ブログを読む</Button>
      </Link>
    </div>
    </div>
    </section>
    <section className="container mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-center">
        <div>
          <Card className=" shadow-orange-200 shadow-md border-orange-400">
            <CardHeader>
              <CardTitle>毒上司と折り合いをつけて、平穏に仕事をする方法を知りたくありませんか？</CardTitle>
              <CardDescription>
                毎日、楽しく面白おかしく仕事をしたいとまでは言わないけど、
                平穏に仕事をこなしていければいいと思っているなら、
                私たちアリザ・アイデアルのメソッドをチェックしてみてください。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-[11pt] md:columns-2">
                <p>
                  アリザ・アイデアルの堤紀久夫は、こんなに面白くて、こんなにも
                  自分に合っている仕事はないとワクワクしながら、プログラマという仕事を選びました。
                </p>
                <p>
                  入社後すぐに派遣された研究所では、大学で学んできた人工知能システムの開発を行い、
                  上司や先輩にも恵まれ、楽しく仕事をこなしていました。
                  時には深夜まで残業することもありましたが、辛いと思ったことはありませんでした。
                </p>
                <p>
                  しかし、転機が訪れたのは、２年間の派遣期間が過ぎ、地方にある本社に帰任してからでした。
                  そこには、毒上司や毒先輩たちが跋扈していたのです。
                </p>
                <p>
                  わたしはたちまち神経性胃炎になりました。
                  そして人間関係と仕事しすぎから抑うつ状態になり、
                  最終的に１０年間も休職し、
                  ３０〜４０歳の貴重な時間を無駄にしてしまったのです...
                </p>
                {/* <p>
                    休職している間に、寝たきりだった母がなくなり、父も逝ってしまいました。
                    </p>
                    <p>結局１０年かけて闘病した後、またプログラマとして復職することに成功しました。
                    やはり、プログラミングの楽しさを忘れられなかったのです。
                    復職してから１２年以上平穏に仕事ができるようになったのです。
                    </p>
                    <p>
                    世間では、同じようにプログラマとして抑うつになり、
                    復職が叶わない方が多いと聞きます。
                    プログラマとして復職するどころか、
                    どんな仕事にも就くことができない人もいらっしゃいます。
                    </p>
                    <p>実際、わたしの数少ないプログラマの友人は、ストレスからくる
                    暴飲暴食による内蔵不全から、ある朝一人暮らしのマンションの部屋で
                    冷たくなって発見されました。
                    </p>
                    <p>
                    もう一人、同じ頃に研究所に派遣されていた友人は、
                    寮の部屋でビニール袋をかぶって自死を選びました。
                    </p>
                    <p>
                    そこでわたしは、そうなってしまいそうなあなたに、
                    あるいは、そうなりたくないあなたに、わたしの経験をシェアしたいと考えました。
                    </p> */}
              </div>
              <Link
                className={cn(
                  buttonVariants({ variant: "orange", size: "xl" }),
                  "mt-4 w-full"
                )}
                href="#"
              >
                もっと詳しく...
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
