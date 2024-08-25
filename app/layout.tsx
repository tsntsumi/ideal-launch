import "@/styles/tailwind.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Providers } from "./providers"
import { cx } from "@/utils/all"
import { Inter, Lora } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const tagId = process.env.NEXT_PUBLIC_LAUNCH_TAGMANAGER
  const gaId = process.env.NEXT_PUBLIC_LAUNCH_MEASUREMENTID
  return (
    <html
      lang="ja-JP"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable)}>
      <body className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId={`${gaId}`} />
    </html>
  );
}
