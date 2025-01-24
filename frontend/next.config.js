/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  // transpilePackages: ['three'],
  compress: true,
  distDir: 'build',
  productionBrowserSourceMaps: true,
  experimental: {
    serverComponentsExternalPackages: ['react-bootstrap'],
    optimizeCss: true,
  },
};
module.exports = withBundleAnalyzer(nextConfig);
