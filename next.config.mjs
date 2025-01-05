/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "**.googleusercontent.com", protocol: "https" },
      { hostname: "**.githubusercontent.com", protocol: "https" },
      { hostname: "**.tmdb.org", protocol: "https" },
      { hostname: "gravatar.com", protocol: "https" },
      { hostname: "img.clerk.com", protocol: "https" },
      { hostname: "m.media-amazon.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
