/** @type {import('next').NextConfig} */

const cspHeader = `
    upgrade-insecure-requests
`

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "X-Frame-Options",
        value: "sameorigin",
    },
    {
        key: "Permissions-Policy",
        value: "accelerometer=(), camera=(), cross-origin-isolated=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), usb=()",
    },
    {
        key: "Referrer-Policy",
        value: "no-referrer-when-downgrade",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
];

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.edilogic.fr',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                ],
            },
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    },
};

export default nextConfig;
