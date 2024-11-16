/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_WAGMI_PROJECT_ID: process.env.PROJECT_ID,
    NEXT_PUBLIC_CDP_PROJECT_ID: process.env.CDP_PROJECT_ID,
    NEXT_PUBLIC_CDP_API_KEY: process.env.CDP_API_KEY,
    NEXT_PUBLIC_CDP_API_SECRET: process.env.CDP_API_SECRET,
    NEXT_PUBLIC_CDP_CLIENT_KEY: process.env.CDP_CLIENT_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.API_BASE_URL,
    NEXT_PUBLIC_SOCKET_BASE_URL: process.env.SOCKET_BASE_URL,
    NEXT_PUBLIC_OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    NEXT_PUBLIC_TWITTER_API_KEY: process.env.TWITTER_API_KEY,
    NEXT_PUBLIC_TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
    NEXT_PUBLIC_TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    NEXT_PUBLIC_TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    NEXT_PUBLIC_TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
    NEXT_PUBLIC_TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    NEXT_PUBLIC_TWITTER_ACCESS_TOKEN_SECRET:
      process.env.TWITTER_ACCESS_TOKEN_SECRET,
    NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID,
    NEXT_PUBLIC_WEB3_AUTH_CLIENT_SECRET: process.env.WEB3_AUTH_CLIENT_SECRET,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  async headers() {
    return [
      {
        source: "/usports/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/api/chat/create",
        destination: `${process.env.API_BASE_URL}/api/chat/create`,
      },
      {
        source: "/api/chat/recent",
        destination: `${process.env.API_BASE_URL}/api/chat/recent`,
      },
      {
        source: "/api/chat",
        destination: `${process.env.API_BASE_URL}/api/chat`,
      },
      {
        source: "/api/users/login",
        destination: `${process.env.API_BASE_URL}/api/users/login`,
      },
      {
        source: "/api/transaction/pool-in",
        destination: `${process.env.API_BASE_URL}/api/transaction/pool-in`,
      },
      {
        source: "/api/tweet",
        destination: `${process.env.API_BASE_URL}/api/tweet`,
      },
      {
        source: "/api/xmtp",
        destination: `${process.env.API_BASE_URL}/api/xmtp`,
      },
    ];
  },
};

export default nextConfig;
