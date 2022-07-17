const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/list',
  '@fullcalendar/daygrid',
  '@fullcalendar/react',
])

const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : ''

// module.exports = {
//   assetPrefix: urlPrefix,
//   basePath: urlPrefix,
//   trailingSlash: true,
//   publicRuntimeConfig: { urlPrefix },  // ★コレ
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
  },
  domains: [
    {
      // domain: 'meruplanet.com',
      domain: 'anime-tier.com',
      defaultLocale: 'ja',
    }
  ],
  images: {
    // domains: ['api','localhost','api.meruplanet.com'],
    domains: ['api','localhost'],
  },
  env: {
    MY_ENV_VAR: process.env.MY_ENV_VAR,
    MY_ENV_VAR2: 3333,

  },
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },  
  optimizeFonts: false,
}

module.exports =  withTM(nextConfig)
