"use client";
import Link from "next/link";
import { useState } from "react";
import { useRecentNews } from "@/hooks/useRecentNews"; // Adjust path if needed

export default function News2() {
  const [activeIndex, setActiveIndex] = useState(2);
  const { data: newsItems, isLoading, isError, error } = useRecentNews();

  const handleIndex = (index) => {
    setActiveIndex(index);
  };

  if (isLoading) return <p className="text-center">Loading news...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error?.message || "Unable to load news."}</p>;

  if (!newsItems || newsItems.length === 0) {
    return (
      <section className="news-section fix section-padding pt-0" id="blog">
        <div className="container text-center">
          <h2 className="mb-4">Latest News</h2>
          <p>We are launching the blogs soon.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="news-section fix section-padding pt-0" id="blog">
        <div className="shape-3 float-bob-y">
          <img src="assets/img/news/shape-3.png" alt="img" />
        </div>
        <div className="shape-4 float-bob-y">
          <img src="assets/img/news/shape-4.png" alt="img" />
        </div>
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                Latest News
              </h2>
            </div>
            <Link
              href="/news-grid"
              className="theme-btn wow fadeInUp"
              data-wow-delay=".5s"
            >
              View all post <i className="fa-regular fa-arrow-right" />
            </Link>
          </div>

          <div className="row">
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleIndex(item.id)}
                className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay={item.delay || `.${(index + 1) * 2}s`}
              >
                <div
                  className={
                    activeIndex === item.id ? "news-box-items active" : "news-box-items"
                  }
                >
                  <div className="news-image">
                    <img src={item.image} alt={item.title} />
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="news-content">
                    <ul className="post-list">
                      <li>{item.category}</li>
                      <li>{item.date}</li>
                    </ul>
                    <h4>
                      <Link href={`/news-details/${item.id}`}>{item.title}</Link>
                    </h4>
                    <div className="author-items">
                      <div className="author-info">
                        <div className="content">
                          <h6>Admin</h6>
                          <p>{item.authorName || "Unknown Author"}</p>
                        </div>
                      </div>
                      <Link href={`/news-details/${item.id}`} className="link-btn">
                        Read More <i className="fa-solid fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
