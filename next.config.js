// const withPWA = require('next-pwa')({
//   disable: process.env.NODE_ENV === 'development',
//   dest: 'public',
// })

module.exports = {
  trailingSlash: false,
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // siteDomain: 'grg.com.au',
    // projectName: 'Hedgey Claims',
    siteDomain: 'app.hedgey.finance',
    // siteTitle: ' | Hedgey Claims',
    siteDescription:
      '',
    siteUrl: 'https://hedgey-claims.vercel.app',
    siteImagePreviewURL: 'https://app.hedgey.finance/wordmark-twitter-card.jpg',
  },

  images: {
    imageSizes: [16, 32, 48, 64],
    deviceSizes: [96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    loader: 'default',
    domains: ['www.datocms-assets.com', 'static.staging.tally.xyz', 'static.tally.xyz'],
  },

  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack', options: { titleProp: true } }],
      },
      { test: /face-api.esm.js/, type: 'javascript/esm' }
    )
    config.resolve.fallback = { fs: false }

    return config
  },
}
