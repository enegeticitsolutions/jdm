import "@/node_modules/react-modal-video/css/modal-video.css"
// Notice: The 9 CSS imports from /public/ have been deleted!
import Providers from "./provider";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--nunito-font-family",
  display: "swap",
});

export const metadata = {
  title: "JDM Group - Customer Delight is Our Passion",
  description: "JDM Group - Customer Delight is Our Passion",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/favicon-squared.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* We added the <head> tag here to load the CSS statically */}
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon-squared.jpg" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/meanmenu.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/color.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>

      <body className={`${nunito.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}