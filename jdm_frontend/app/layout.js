import "@/node_modules/react-modal-video/css/modal-video.css"
import "/public/assets/css/bootstrap.min.css";
import "/public/assets/css/all.min.css";
import "/public/assets/css/animate.css";
import "/public/assets/css/magnific-popup.css";
import "/public/assets/css/meanmenu.css";
import "/public/assets/css/swiper-bundle.min.css";
import "/public/assets/css/nice-select.css";
import "/public/assets/css/color.css";
import "/public/assets/css/main.css";
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
      <body className={`${nunito.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
