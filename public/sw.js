if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, n) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let i = {};
    const t = (e) => a(e, r),
      d = { module: { uri: r }, exports: i, require: t };
    s[r] = Promise.all(c.map((e) => d[e] || t(e))).then((e) => (n(...e), i));
  };
}
define(["./workbox-5f5b08d6"], function (e) {
  "use strict";
  importScripts("fallback-PtPH-LY_arq2GdDG6Qngr.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/404.svg", revision: "d38ac435783a21f1956e5ca6c207228d" },
        {
          url: "/_next/static/PtPH-LY_arq2GdDG6Qngr/_buildManifest.js",
          revision: "09b2bb7a88487bf45162f3fe5766db8a",
        },
        {
          url: "/_next/static/PtPH-LY_arq2GdDG6Qngr/_ssgManifest.js",
          revision: "5352cb582146311d1540f6075d1f265e",
        },
        {
          url: "/_next/static/chunks/229-f6edccec28134124.js",
          revision: "f6edccec28134124",
        },
        {
          url: "/_next/static/chunks/275-2f9543599eddecca.js",
          revision: "2f9543599eddecca",
        },
        {
          url: "/_next/static/chunks/31664189-86232d7218231641.js",
          revision: "86232d7218231641",
        },
        {
          url: "/_next/static/chunks/388-f088feed26008984.js",
          revision: "f088feed26008984",
        },
        {
          url: "/_next/static/chunks/465-4e3bb83351e32648.js",
          revision: "4e3bb83351e32648",
        },
        {
          url: "/_next/static/chunks/61-6f13b18f408844ea.js",
          revision: "6f13b18f408844ea",
        },
        {
          url: "/_next/static/chunks/645-b50bba24b65b5bf1.js",
          revision: "b50bba24b65b5bf1",
        },
        {
          url: "/_next/static/chunks/67-6e4c9c3f6fad5fbe.js",
          revision: "6e4c9c3f6fad5fbe",
        },
        {
          url: "/_next/static/chunks/682-14d2025ac69c94e8.js",
          revision: "14d2025ac69c94e8",
        },
        {
          url: "/_next/static/chunks/725-0e0e9c87c34c2aea.js",
          revision: "0e0e9c87c34c2aea",
        },
        {
          url: "/_next/static/chunks/737-5c3dafbfdbc85d3b.js",
          revision: "5c3dafbfdbc85d3b",
        },
        {
          url: "/_next/static/chunks/742-6501cc6d9a44e99b.js",
          revision: "6501cc6d9a44e99b",
        },
        {
          url: "/_next/static/chunks/74fdba35-88b19efeab048c0e.js",
          revision: "88b19efeab048c0e",
        },
        {
          url: "/_next/static/chunks/779-d2c66ab2b7632f08.js",
          revision: "d2c66ab2b7632f08",
        },
        {
          url: "/_next/static/chunks/920-1d36b4222cc30cd0.js",
          revision: "1d36b4222cc30cd0",
        },
        {
          url: "/_next/static/chunks/963-d78d627aae6793a7.js",
          revision: "d78d627aae6793a7",
        },
        {
          url: "/_next/static/chunks/a908dc70-be03978c9420fe5d.js",
          revision: "be03978c9420fe5d",
        },
        {
          url: "/_next/static/chunks/ae51ba48-f65fd81c042f5ca7.js",
          revision: "f65fd81c042f5ca7",
        },
        {
          url: "/_next/static/chunks/c9184924-cb1dbd195e2bfc2a.js",
          revision: "cb1dbd195e2bfc2a",
        },
        {
          url: "/_next/static/chunks/d64684d8-a3f56cb0132b8d68.js",
          revision: "a3f56cb0132b8d68",
        },
        {
          url: "/_next/static/chunks/framework-1ab352c3db5b6d5b.js",
          revision: "1ab352c3db5b6d5b",
        },
        {
          url: "/_next/static/chunks/main-6658750bc323d0ca.js",
          revision: "6658750bc323d0ca",
        },
        {
          url: "/_next/static/chunks/pages/404-42a27a5b351a10f1.js",
          revision: "42a27a5b351a10f1",
        },
        {
          url: "/_next/static/chunks/pages/_app-92eb3f14f8cb208b.js",
          revision: "92eb3f14f8cb208b",
        },
        {
          url: "/_next/static/chunks/pages/_error-7397496ca01950b1.js",
          revision: "7397496ca01950b1",
        },
        {
          url: "/_next/static/chunks/pages/_offline-a0be11bd1c85f6cb.js",
          revision: "a0be11bd1c85f6cb",
        },
        {
          url: "/_next/static/chunks/pages/about-us-2f44e71222fd215a.js",
          revision: "2f44e71222fd215a",
        },
        {
          url: "/_next/static/chunks/pages/checkout-d9c5c29ccc9b9a28.js",
          revision: "d9c5c29ccc9b9a28",
        },
        {
          url: "/_next/static/chunks/pages/contact-us-9d7916eb6e31c364.js",
          revision: "9d7916eb6e31c364",
        },
        {
          url: "/_next/static/chunks/pages/faq-44af18df8811aa9d.js",
          revision: "44af18df8811aa9d",
        },
        {
          url: "/_next/static/chunks/pages/index-4d663cd89cca6bd2.js",
          revision: "4d663cd89cca6bd2",
        },
        {
          url: "/_next/static/chunks/pages/offer-6380e300307f42dc.js",
          revision: "6380e300307f42dc",
        },
        {
          url: "/_next/static/chunks/pages/order/%5Bid%5D-98f456c6ff375433.js",
          revision: "98f456c6ff375433",
        },
        {
          url: "/_next/static/chunks/pages/privacy-policy-a3a2510749987d66.js",
          revision: "a3a2510749987d66",
        },
        {
          url: "/_next/static/chunks/pages/product/%5Bslug%5D-2f4d42bf959ae5f4.js",
          revision: "2f4d42bf959ae5f4",
        },
        {
          url: "/_next/static/chunks/pages/search-4ffe4a52867b8d77.js",
          revision: "4ffe4a52867b8d77",
        },
        {
          url: "/_next/static/chunks/pages/terms-and-conditions-297fefee113ae08a.js",
          revision: "297fefee113ae08a",
        },
        {
          url: "/_next/static/chunks/pages/user/change-password-28e153158c5997c6.js",
          revision: "28e153158c5997c6",
        },
        {
          url: "/_next/static/chunks/pages/user/dashboard-9478e1c9e00df513.js",
          revision: "9478e1c9e00df513",
        },
        {
          url: "/_next/static/chunks/pages/user/email-verification/%5Btoken%5D-c259728968082b6a.js",
          revision: "c259728968082b6a",
        },
        {
          url: "/_next/static/chunks/pages/user/forget-password/%5Btoken%5D-733a7d3aff06a3d9.js",
          revision: "733a7d3aff06a3d9",
        },
        {
          url: "/_next/static/chunks/pages/user/my-orders-4ca66df048aa2809.js",
          revision: "4ca66df048aa2809",
        },
        {
          url: "/_next/static/chunks/pages/user/recent-order-22a3db6e16a512d3.js",
          revision: "22a3db6e16a512d3",
        },
        {
          url: "/_next/static/chunks/pages/user/update-profile-9e9762cf8b20416e.js",
          revision: "9e9762cf8b20416e",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-211c438de79acdca.js",
          revision: "211c438de79acdca",
        },
        {
          url: "/_next/static/css/6c7987e2821e600c.css",
          revision: "6c7987e2821e600c",
        },
        {
          url: "/_next/static/css/aa3f706cc3e37d02.css",
          revision: "aa3f706cc3e37d02",
        },
        {
          url: "/_next/static/css/f1d5a30b5a4d1378.css",
          revision: "f1d5a30b5a4d1378",
        },
        {
          url: "/_next/static/media/logo-color.d0ef4d61.png",
          revision: "5935965ef93ee2a9eab4a1240699bc5f",
        },
        { url: "/_offline", revision: "PtPH-LY_arq2GdDG6Qngr" },
        {
          url: "/about-banner.jpg",
          revision: "79bcd14e1663eeb10fd2078a1b40a68a",
        },
        { url: "/about-us.jpg", revision: "a69c8f7c944c6dd9673e4e8407684ae9" },
        {
          url: "/app-download-img-left.png",
          revision: "72d8da82c11b9694f687e2b24711a82a",
        },
        {
          url: "/app-download-img.png",
          revision: "22ab424e74d09df11be0f6943a264856",
        },
        {
          url: "/app/app-store.svg",
          revision: "a717e97b14d37aa12c48a288bddf4bae",
        },
        {
          url: "/app/mastercard-icon.svg",
          revision: "2f3b7f6dc10d68bf74366ce0e4b39217",
        },
        {
          url: "/app/paypal-icon.svg",
          revision: "99025da84086629516e323641cdfd73b",
        },
        {
          url: "/app/play-store.svg",
          revision: "a2b0ad8b1000e23bf80ca9ef30b14b97",
        },
        {
          url: "/app/skrill-icon.svg",
          revision: "01cb261e1e28b74c3f51a379a63216d3",
        },
        {
          url: "/app/visa-icon.svg",
          revision: "58cb00fe42ab95ae26c5e7e429f04545",
        },
        { url: "/banner-1.jpg", revision: "96eaf5765f56f7574dc21db0424668f3" },
        { url: "/banner-2.jpg", revision: "d08fc088d9d75823e8259261e9208cf2" },
        {
          url: "/contact-us.png",
          revision: "1f0a34dcebe83884f7d986c29069cff0",
        },
        { url: "/cta-bg.png", revision: "0dd94ded00743cc74d0da8027b579b73" },
        {
          url: "/cta/cta-bg-1.jpg",
          revision: "45b3e432be8fc7f3eb09f2568a61d8c2",
        },
        {
          url: "/cta/cta-bg-2.jpg",
          revision: "83ca16fa37654fd7de5518d0f347a29c",
        },
        {
          url: "/cta/cta-bg-3.jpg",
          revision: "42c150e775ca1b35399b3428d5ee2e00",
        },
        {
          url: "/cta/delivery-boy.png",
          revision: "9914b651b1428467046e8b886166dac9",
        },
        {
          url: "/facebook-page.png",
          revision: "0a668853fee7423c27bb93b947a6fc1c",
        },
        { url: "/faq.svg", revision: "2979a7b97c0c5d96960e9558a389bbd4" },
        { url: "/favicon.png", revision: "0033e08ea1185a9ef4ddea787f470df5" },
        {
          url: "/icon-192x192.png",
          revision: "47e2812c3e78f1903ccd46f0545f5d48",
        },
        {
          url: "/icon-256x256.png",
          revision: "5cfadd2f4679b3d86f1d994297809226",
        },
        {
          url: "/icon-384x384.png",
          revision: "e793bffd9497800be7d461caa873b96b",
        },
        {
          url: "/icon-512x512.png",
          revision: "b9df59369ad910b5d3e338e9076fd944",
        },
        {
          url: "/kachabazar-store-min.png",
          revision: "6bf12cd3f0a8d7ccf8285ea0672bf182",
        },
        {
          url: "/logo/bag-shoping.svg",
          revision: "54014870b794b613e62017decbe943d0",
        },
        {
          url: "/logo/logo-color.png",
          revision: "5935965ef93ee2a9eab4a1240699bc5f",
        },
        {
          url: "/logo/logo-color.svg",
          revision: "9cdfd2a1723ebe5d6fbfeb2a3a07765d",
        },
        {
          url: "/logo/logo-dark-2.svg",
          revision: "990e13afb1b79734e26b71f2fcc062d9",
        },
        {
          url: "/logo/logo-dark.svg",
          revision: "3d5619a9dd2312d20ee908259e95a635",
        },
        {
          url: "/logo/logo-light-2.svg",
          revision: "8e9e97fd3acd9a7aa3525e2c5eb93811",
        },
        {
          url: "/logo/logo-light.svg",
          revision: "a295f016c697789c084b023006b33ac5",
        },
        { url: "/manifest.json", revision: "1bdc898597594f46bcd9b0ae76e7c991" },
        { url: "/no-result.svg", revision: "508b2439b4b83ce579e826c9c625b675" },
        {
          url: "/page-header-bg.jpg",
          revision: "c7cf9224e6c1ae3add73d30c2ae7a8f8",
        },
        {
          url: "/payment-method/payment-logo.png",
          revision: "469911779f6463e5751cf5b7046384d2",
        },
        { url: "/robots.txt", revision: "61c27d2cd39a713f7829422c3d9edcc7" },
        {
          url: "/service-worker.js",
          revision: "3e77307af084a6bfd85b1c04fb1dffde",
        },
        {
          url: "/slider/slider-1.jpg",
          revision: "9611448d0a85493ee21c5317323cb601",
        },
        {
          url: "/slider/slider-2.jpg",
          revision: "fe98a6e4032332b05d52aa1254f085a7",
        },
        {
          url: "/slider/slider-3.jpg",
          revision: "06cef52491c3b8682d15596e784362bb",
        },
        {
          url: "/team/team-1.jpg",
          revision: "e318a12728d39d01c926be7fbbcd6876",
        },
        {
          url: "/team/team-2.jpg",
          revision: "ba945720d060272d028634a8729b7d2b",
        },
        {
          url: "/team/team-3.jpg",
          revision: "dfa429c7e964aa5a8ea01c3959710529",
        },
        {
          url: "/team/team-4.jpg",
          revision: "490ae645f676543ef728fc2548a6bd3f",
        },
        {
          url: "/team/team-5.jpg",
          revision: "a345363d59da88084c7fd6de76cc978c",
        },
        {
          url: "/team/team-6.jpg",
          revision: "39e8a23ea2ae4bc88316d1ddad73132c",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    );
});
