// import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "**.googleusercontent.com", protocol: "https" },
      { hostname: "**.githubusercontent.com", protocol: "https" },
      { hostname: "**.tmdb.org", protocol: "https" },
      { hostname: "gravatar.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
