import { FishIcon } from "lucide-react";
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="/logo.svg" alt="logo" width="32" height="32" />
          <p className="text-center text-sm leading-loose md:text-left">
            An{" "}
            <span
              className="font-medium underline underline-offset-4"
            >
              alizza ideal
            </span>{" "}
            project.
          </p>
        </div>
      </div>
    </footer>
  );
};
