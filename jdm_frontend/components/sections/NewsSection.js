"use client";
import Link from "next/link";
import { useState } from "react";
import { useNewsData } from "@/hooks/useNewsData";

const ITEMS_PER_PAGE = 9;

export default function NewsSection() {
  const { data: newsItems, isLoading, isError, error } = useNewsData();
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <p>Loading news...</p>;
  if (isError) return <p>Error loading news: {error?.message || "Unknown error"}</p>;

  if (!newsItems || newsItems.length === 0) {
    return <p className="text-center">We are launching the blogs soon.</p>;
  }

  // Pagination calculations
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const paginatedItems = newsItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleIndex = (index) => {
    setActiveIndex(index);
  };

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    setActiveIndex(1); // reset active index when page changes
  };

  return (
    <section className="news-section fix section-padding">
      <div className="container">
        {/* News items grid: 3 per row */}
        <div className="row g-4">
          {paginatedItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleIndex(index + 1)}
              className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={`.${2 + index * 2}s`}
            >
              <div
                className={
                  activeIndex === index + 1
                    ? "news-box-items mt-0 active"
                    : "news-box-items mt-0"
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
                      <img src={item.authorImage} alt={item.authorName} />
                      <div className="content">
                        <h6>{item.author}</h6>
                        <p>{item.authorName}</p>
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

        {/* Pagination controls */}
        <div
          className="page-nav-wrap pt-5 text-center wow fadeInUp"
          data-wow-delay=".3s"
        >
          <ul className="pagination justify-content-center">
            <li>
              <button
                className="page-numbers icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                <i className="fa-solid fa-arrow-left" />
              </button>
            </li>

            {/* Show page numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1}>
                <button
                  className={`page-numbers ${currentPage === i + 1 ? "current" : ""}`}
                  onClick={() => goToPage(i + 1)}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              </li>
            ))}

            <li>
              <button
                className="page-numbers icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                <i className="fa-solid fa-arrow-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
