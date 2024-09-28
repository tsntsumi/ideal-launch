import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import { FishIcon, ScanTextIcon } from "lucide-react";
import Link from "next/link";
import Image from 'next/image'
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <>
      <div className="animate-in fade-in w-full">
        <nav className="container px-6 md:px-8 py-4">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
                <Image src="/logo.svg" alt="logo" width="128" height="128" className="w-16 h-16 pb-4 mr-0 inline-block" />
                <div className="inline-block text-xs"><div>アリザ・</div><div>アイデアル</div></div>
            </Link>
    <div className="hidden md:flex justify-between grow">
      <div>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          🏡ホーム
        </Link>
        <Link href="/blog" className={buttonVariants({ variant: "link" })}>
          📖ブログ
        </Link>
        <Link href="/archive" className={buttonVariants({ variant: "link" })}>
          📚アーカイブ
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <NavbarUserLinks />
      </div>
    </div>
    <div className="grow md:hidden flex justify-end">
      <NavbarMobile />
    </div>
    </div>
    </nav>
    </div>
    </>
  );
};
