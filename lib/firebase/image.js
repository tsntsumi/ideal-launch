// import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/lib/firebase/config";
import { App } from './client'
import { ref, getDownloadURL } from "firebase/storage"

export const urlForImage = source => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?.split(/[-.]/)[1];

  const [width, height] = dimensions
    .split(/[xX]/)
    .map(num => parseInt(num, 10));

  let url = null
  const r = ref(App.Storage, source.asset)
  getDownloadURL(r).then((u) => {
    url = u
  })

  return {
    src: url,
    width: width,
    height: height
  };
};
