import { initAdmin } from "@/lib/firebase/admin"
import { getSettings } from "@/lib/firebase/settings"
import Contact from "./contact";

export default async function ContactPage() {
  await initAdmin()
  const settings = await getSettings();
  return <Contact settings={settings} />;
}

// export const revalidate = 60;
