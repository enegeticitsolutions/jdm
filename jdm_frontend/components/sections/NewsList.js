"use client";
import { useState } from "react";
import Link from "next/link";
import { useNewsData } from "@/hooks/useNewsData"; // Your custom hook

const ITEMS_PER_PAGE = 5;

export default function NewsList() {
  const { data: newsItems, isLoading, isError, error } = useNewsData();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <p>Loading news...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!newsItems || newsItems.length === 0) return <p>No news available.</p>;

  // Pagination calculations
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  const paginatedItems = newsItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Recent posts (latest 3 by date)
  const recentPosts = [...newsItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Popular tags logic
  const tagCounts = newsItems.reduce((acc, item) => {
    if (Array.isArray(item.tags)) {
      item.tags.forEach((tag) => {
        const lowerTag = tag.toLowerCase();
        acc[lowerTag] = (acc[lowerTag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  // Sort tags by count desc and take top 10
  const popularTags = Object.entries(tagCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10)
    .map(([tag]) => tag);

  // Pagination page switcher helper
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  return (
    <section className="news-standard fix section-padding">
      <div className="container">
        <div className="row g-4">
          {/* Main news list */}
          <div className="col-12 col-lg-8">
            <div className="news-standard-wrapper">
              {paginatedItems.map((item) => (
                <div key={item.id} className="news-standard-items">
                  <div className="news-thumb">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="news-content">
                    <ul className="date-list">
                      <li>
                        <i className="fa-regular fa-user" />
                        {item.author || "Admin"}
                      </li>
                      <li>
                        <i className="fa-regular fa-calendar-days" />
                        {item.date || "Unknown Date"}
                      </li>
                      <li>
                        <i className="fa-regular fa-calendar-days" />
                        {item.category || "Uncategorized"}
                      </li>
                    </ul>
                    <h3>
                      <Link href={`/news-details/${item.id}`}>
                        {item.title || "Untitled News"}
                      </Link>
                    </h3>
                    <p>{item.short_description || "No description available."}</p>
                    <div className="news-button">
                      <Link href={`/news-details/${item.id}`} className="theme-btn mt-4">
                        read more <i className="fa-regular fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="page-nav-wrap wow fadeInUp" data-wow-delay=".3s">
                <ul className="pagination">
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

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1}>
                      <button
                        className={`page-numbers ${currentPage === i + 1 ? "current" : ""}`}
                        onClick={() => goToPage(i + 1)}
                      >
                        {i + 1}
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
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="main-sidebar">
              {/* Search Widget */}
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Search</h3>
                </div>
                <div className="search-widget">
                  <form action="#">
                    <input type="text" placeholder="Search here" />
                    <button type="submit">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Recent Post</h3>
                </div>
                <div className="recent-post-area">
                  {recentPosts.map((post) => (
                    <div className="recent-items" key={post.id}>
                      <div className="recent-thumb">
                        <img src={post.image} alt={post.title} />
                      </div>
                      <div className="recent-content">
                        <ul>
                          <li>
                            <i className="fa-solid fa-calendar-days" />
                            {post.date || "Unknown Date"}
                          </li>
                        </ul>
                        <h6>
                          <Link href={`/news-details/${post.id}`}>{post.title || "Untitled News"}</Link>
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Popular Tag</h3>
                </div>
                <div className="news-widget-categories">
                  <div className="tagcloud">
                    {popularTags.map((tag) => (
                      <Link key={tag} href={`/news-details?tag=${encodeURIComponent(tag)}`}>
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
