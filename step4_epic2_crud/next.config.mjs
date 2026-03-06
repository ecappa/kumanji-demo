/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['app', 'components', 'lib']
  },
  typedRoutes: true
};

export default nextConfig;