/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images servies telles quelles : l'optimiseur de Next ne peut pas lire les photos privées
  // (cookie du visiteur) et, avec un chargeur « custom », il répondait 404 pour toutes les autres.
  images: { unoptimized: true },
}
export default nextConfig
