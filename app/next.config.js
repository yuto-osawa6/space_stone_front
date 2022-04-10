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
  }
}

module.exports =  withTM(nextConfig)
