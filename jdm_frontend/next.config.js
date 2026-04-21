/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "82.112.236.35",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.jdmgroups.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
