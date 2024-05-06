module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.bstable.bitrus.com/:path*',
      },
    ];
  },
};
