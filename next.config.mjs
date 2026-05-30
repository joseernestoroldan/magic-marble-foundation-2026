/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  optimizePackageImports: ["react-icons"],
  images: {
    loaderFile: "./app/lib/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};



export default nextConfig;

