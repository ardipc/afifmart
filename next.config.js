/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'ui-avatars.com',
      'tailwindui.com',
      'cymagsnihvppzuqevvge.supabase.co'
    ]
  }
}

module.exports = nextConfig
