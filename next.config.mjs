/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback.os = false;
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.path = false;
    }
    return config;
  },
  output: "standalone",
  reactStrictMode: false,
};

export default nextConfig;
