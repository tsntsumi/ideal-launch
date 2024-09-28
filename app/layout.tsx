import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
//import "@/styles/tailwind.css";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import { MyFirebaseProvider } from "@/components/firebase-providers";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "プログラマが充実した仕事をする",
  description:
    "仕事でプログラミングを楽しめていますか？仕事を楽しめなかったら、充実感を味わえません。充実感がなかったら、たとえ幸福でも人生は虚しいものです。充実した仕事をするための情報を発信しています。ぜひブログをお読みください。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={cn(font.className)}>
        <MyFirebaseProvider>
          {children}
          <Toaster />
        </MyFirebaseProvider>
      </body>
    </html>
  );
}
