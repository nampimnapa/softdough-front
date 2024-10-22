/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=31536000; includeSubDomains'
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff'
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN'
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block'
                },
                {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin'
                }
            ]
        }
    ];
},
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
