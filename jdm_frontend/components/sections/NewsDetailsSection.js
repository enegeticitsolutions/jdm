import Link from "next/link";

export default function NewsDetailsSection({ blogData, recentPosts = [] }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://jdm-backend.onrender.com";

  // Prepare tags safely
  const tags = blogData?.tags || [];

  // Prepare description array safely
  const descriptionArray = Array.isArray(blogData?.short_description)
    ? blogData.short_description
    : blogData?.short_description
    ? [blogData.short_description]
    : ["No description available."];

  return (
    <section className="news-standard fix section-padding">
      <div className="container">
        <div className="row g-4">
          {/* Main content */}
          <div className="col-12 col-lg-8">
            <div className="blog-post-details">
              <div className="single-blog-post">
                <div
                  className="post-featured-thumb bg-cover"
                  style={{
                    backgroundImage: `url(${blogData?.image || "/assets/img/news/post-4.jpg"})`,
                  }}
                />
                <div className="post-content">
                  <ul className="post-list d-flex align-items-center">
                    <li>
                      <i className="fa-regular fa-user" />
                      {blogData?.author || "Admin"}
                    </li>
                    <li>
                      <i className="fa-solid fa-calendar-days" />
                      {blogData?.date || "N/A"}
                    </li>
                    <li>
                      <i className="fa-solid fa-tag" />
                      {tags[0] || "General"}
                    </li>
                  </ul>
                  <h3>{blogData?.title || "No Title"}</h3>
                  {descriptionArray.map((paragraph, index) => (
                    <p key={index} className={index < 2 ? "mb-3" : ""}>
                      {paragraph}
                    </p>
                  ))}
                  {blogData?.quote && (
                    <div className="hilight-text mt-4 mb-4">
                      <p>{blogData.quote}</p>
                      {/* SVG here */}
                    </div>
                  )}
                  {blogData?.in_between_image && (
                    <div className="details-image my-4">
                      <img src={blogData.in_between_image} alt={blogData.title} />
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="row tag-share-wrap mt-4 mb-5">
                  <div className="col-lg-8 col-12">
                    <div className="tagcloud">
                      <span>Tags:</span>
                      {tags.map((tag, index) => (
                        <Link key={index} href={`/news?tag=${tag}`}>
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Social share - static or dynamic as you want */}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="main-sidebar">
              {/* Popular Tags */}
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Popular Tag</h3>
                </div>
                <div className="news-widget-categories">
                  <div className="tagcloud">
                    {tags.map((tag, idx) => (
                      <Link key={idx} href={`/news?tag=${tag}`}>
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="single-sidebar-widget">
                <div className="wid-title">
                  <h3>Recent Post</h3>
                </div>
                <div className="recent-post-area">
                  {recentPosts.length > 0 ? (
                    recentPosts.map((post) => (
                      <div key={post.id} className="recent-items">
                        <div className="recent-thumb">
                          <img
                            src={post.image}
                            alt={post.title}
                          />
                        </div>
                        <div className="recent-content">
                          <ul>
                            <li>
                              <i className="fa-solid fa-calendar-days" />
                              {post.date || "Unknown date"}
                            </li>
                          </ul>
                          <h6>
                            <Link href={`/news-details/${post.id}`}>
                              {post.title}
                            </Link>
                          </h6>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No recent posts found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* End Sidebar */}
        </div>
      </div>
    </section>
  );
}
