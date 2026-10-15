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
      // Production API server — required for all uploaded images to load
      {
        protocol: "https",
        hostname: "api.datamoshtechnologies.com",
        pathname: "/**",
      },
    ],
  },
  // Automatically removes all console.log/warn/error calls in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/index.php/company/history",
        destination: "/#journey",
        permanent: true,
      },
      {
        source: "/index.php/company/history/:path*",
        destination: "/#journey",
        permanent: true,
      },
      {
        source: "/company/history",
        destination: "/#journey",
        permanent: true,
      },
      {
        source: "/company/history/:path*",
        destination: "/#journey",
        permanent: true,
      },
      {
        source: "/history",
        destination: "/#journey",
        permanent: true,
      },
      {
        source: "/history/:path*",
        destination: "/#journey",
        permanent: true,
      },
      // Other legacy PHP redirects
      {
        source: "/index.php/about/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/index.php/contact/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/index.php/services/:path*",
        destination: "/service",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/service-details",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Tells Google and search engines to ONLY index the main website homepage
        // and de-index/hide all sub-pages from search results
        source: "/:path((?!_next|assets|favicon|api).+)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
