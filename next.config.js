// module.exports = {
//   reactStrictMode: true,
//   output: "export",
//   // basePath:
//   //   process.env.NODE_ENV === "production"
//   //     ? `/react/molla/demo-${process.env.NEXT_PUBLIC_DEMO}`
//   //     : "",
//   // trailingSlash: true,
//   // env: {
//   //   PUBLIC_URL:
//   //     process.env.NODE_ENV === "production"
//   //       ? `/react/molla/demo-${process.env.NEXT_PUBLIC_DEMO}/`
//   //       : "/",
//   //   APP_URL:
//   //     process.env.NODE_ENV === "production"
//   //       ? "https://d-themes.com/react/molla/"
//   //       : "http://localhost/",
//   // },
//   experimental: {
//     newNextLinkBehavior: false,
//   },
// };

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
  scope: "/",
  sw: "service-worker.js",
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  output: "export",
  experimental: {
    newNextLinkBehavior: false,
  },

});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
