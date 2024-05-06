import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.bstable.bitrus.com/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
