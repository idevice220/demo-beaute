/** Chargeur d'images : les photos privées (/api/media/…) contournent l'optimiseur, qui n'a pas le cookie du visiteur. */
export default function loader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith('/api/media/')) return src
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`
}
