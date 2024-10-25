// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//     ],
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.module.rules.push({
//         test: /\.html$/,
//         use: "html-loader",
//       });
//     }
//     return config;
//   },
// };

// module.exports = nextConfig;

// const withPWA = require("next-pwa")({
//   dest: "public", // Destination du dossier où les fichiers générés par PWA seront stockés
//   register: true, // Enregistre automatiquement le service worker
//   skipWaiting: true,
//   disableDevLogs: true, // Permet de passer à la nouvelle version sans attendre
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = withPWA({
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.pexels.com", // Permet de charger des images à partir de pexels
//       },
//     ],
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.module.rules.push({
//         test: /\.html$/, // Utilisation de html-loader pour charger des fichiers .html
//         use: "html-loader",
//       });
//     }
//     return config;
//   },
// });

// module.exports = nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disableDevLogs: true, // Supprime les logs PWA en mode dev
});

module.exports = withPWA({
  async headers() {
    return [
      {
        source: "/(.*)", // Applique ces en-têtes à toutes les pages
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Protection contre le mime sniffing
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // Protection contre le clickjacking
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Politique stricte de référence HTTP
          },
        ],
      },
      {
        source: "/sw.js", // Applique ces en-têtes uniquement au service worker
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate", // Désactive le cache pour le SW
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'", // Politique de sécurité stricte
          },
        ],
      },
    ];
  },
  // Configuration supplémentaire de Webpack pour gérer les images distantes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com", // Exemple pour charger des images externes
      },
    ],
  },
});
