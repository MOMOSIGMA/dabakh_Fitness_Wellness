/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Plus aucune image distante : toutes les photos du site sont celles de la
    // salle, servies depuis /public. Laisser un remotePattern ouvert reviendrait
    // a offrir l optimiseur Vercel a un domaine tiers.
    remotePatterns: [],
    // Optimisations pour connexion faible (3G)
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Toute valeur passee a `quality` sur un next/image DOIT figurer ici,
    // sinon Next 15 leve une erreur d'execution. Elle ne se voit ni au build
    // ni au `tsc` : un quality={70} pose dans une fenetre modale n'a plante
    // qu'au clic, une fois en ligne. Verifier avec :
    //   grep -rn "quality={" app/
    qualities: [50, 60, 75],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week cache
  },
  compress: true,
  // Réduction bundle
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
    }
    return config
  },
  // Préchargement intelligent
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // En-tetes de securite appliques a toutes les routes.
  // Le motif etait ecrit /(:path*) : malforme, il ne matchait rien.
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=43200',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=43200',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
