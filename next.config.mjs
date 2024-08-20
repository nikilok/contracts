/** @type {import('next').NextConfig} */
const nextConfig = {
  head: {
    // Add your custom meta tag
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1",
      },
      // Other meta tags if needed
    ],
  },
};

export default nextConfig;
