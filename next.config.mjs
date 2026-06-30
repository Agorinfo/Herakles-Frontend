/** @type {import('next').NextConfig} */
const imageHosts = [
    process.env.NEXT_PUBLIC_BACK_URL,
    process.env.BACK_URL,
    process.env.API_URL,
]
    .filter(Boolean)
    .map((url) => {
        try {
            const parsed = new URL(url);
            return {
                protocol: parsed.protocol.replace(":", ""),
                hostname: parsed.hostname,
                port: parsed.port,
                pathname: "/**",
            };
        } catch {
            return null;
        }
    })
    .filter(Boolean);

const nextConfig = {
    images: {
        remotePatterns: imageHosts,
    },
};

export default nextConfig;
