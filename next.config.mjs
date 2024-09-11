/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  eslint:{
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
