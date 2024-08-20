import { initAdmin } from "@/lib/firebase/admin"
import { getAllAuthors } from "@/lib/firebase/author";
import { getSettings } from "@/lib/firebase/settings";
import About from "./about";

export default async function AboutPage() {
  await initAdmin()
  const authors = await getAllAuthors();
  const settings = await getSettings();
  return <About settings={settings} authors={authors} />;
}

// export const revalidate = 60;
