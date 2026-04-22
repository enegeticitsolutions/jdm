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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* We added the <head> tag here to load the CSS statically */}
      <head>
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