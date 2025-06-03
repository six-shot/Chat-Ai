import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Telegram Clone",
    short_name: " Telegram Clone",
    description: "Telegram Clone",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",

    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshot1.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshot2.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
