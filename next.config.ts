import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',         // root URL
        destination: '/home', // redirect to /home
        permanent: true,     // 301 redirect
      },
    ];
  },
};

// next.config.js
module.exports = {
  devIndicators: false,
};


export default nextConfig;
