module.exports = {
  images: {
    domains: [],
    // Use remotePatterns to specify allowed domains with regex patterns
    // This will replace the deprecated domains configuration
    remotePatterns: [
      { hostname: 'placehold.it' },
      { hostname: 'encrypted-tbn0.gstatic.com' },
      { hostname: 'www.google.com' },
      { hostname: 'newbreak.church' },
    ],
  },
};
