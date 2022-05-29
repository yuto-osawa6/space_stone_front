const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/list',
  '@fullcalendar/daygrid',
  '@fullcalendar/react',
])


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api','localhost'],
  },
  env: {
    MY_ENV_VAR: process.env.MY_ENV_VAR,
    MY_ENV_VAR2: 3333,

  }
}

module.exports =  withTM(nextConfig)
