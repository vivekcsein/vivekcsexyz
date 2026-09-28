import type { NextConfig } from "next";

// Set this to your repo name (only needed for a *project* page like
// username.github.io root site).
const useProjectPagesBasePath =
  process.env.NEXT_PUBLIC_GH_PROJECT_PAGES === "true";
const repoName = "vivekcsexyz";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
    unoptimized: true,
  },

  output: "export", // static HTML export -> ./out
  basePath: useProjectPagesBasePath ? `/${repoName}` : "",
  assetPrefix: useProjectPagesBasePath ? `/${repoName}/` : "",
  trailingSlash: true, // GitHub Pages serves /route/index.html cleanly

  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
