import Layout from "@/components/layout/Layout";
import Link from "next/link";
export default function NotFound(error) {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <section className="Error-section section-padding fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="error-items">
                <div className="error-image wow fadeInUp" data-wow-delay=".3s">
                  <img src="assets/img/404.png" alt="img" />
                </div>
                <h2 className="wow fadeInUp" data-wow-delay=".5s">
                  <span>Oops!</span> Page not found
                </h2>
                {error.error && (
                  <p className="wow fadeInUp" data-wow-delay=".6s">
                    {error.error.message}
                  </p>
                )}
                <p className="wow fadeInUp" data-wow-delay=".7s">
                  The page you are looking for does not exist
                </p>
                <Link
                  href="/"
                  className="theme-btn wow fadeInUp"
                  data-wow-delay=".8s"
                >
                  Back to Home
                  <i className="fa-regular fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
