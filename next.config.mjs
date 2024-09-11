/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  eslint:{
    ignoreDuringBuilds: false
  }
};

export default nextConfig;
