"use client";
import React, { memo } from "react";

// Section component
const Section = memo(({ title, type, content, list_items, image, is_image_left, idx }) => {
  // Guarantee alternating layout dynamically or use DB is_image_left
  const imageOnLeft = is_image_left !== undefined ? is_image_left : (idx % 2 === 0);

  return (
    <div className={`row g-5 align-items-center py-5 ${idx > 0 ? "border-top border-light-subtle" : ""}`}>
      <div className={`col-lg-7 order-lg-${imageOnLeft ? 2 : 1}`}>
        <div className="about-content">
          <div className="section-title mb-4">
            <h2 className="wow fadeInUp text-theme-primary font-weight-bold" data-wow-delay=".2s">{title}</h2>
          </div>
          {content && (
            <div
              className="mt-3 leading-relaxed text-muted wow fadeInUp"
              data-wow-delay=".4s"
              style={{ fontSize: "16px", lineHeight: "1.8" }}
              dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }}
            />
          )}
          {list_items && list_items.length > 0 && (
            <ul className="mt-4 wow fadeInUp grid-list" data-wow-delay=".5s" style={{ listStyle: "none", paddingLeft: 0 }}>
              {list_items.map((item, index) => (
                <li key={index} className="value-item d-flex align-items-start mb-3">
                  <i className="fas fa-check-circle me-3 mt-1" aria-hidden="true" />
                  <span className="text-dark" style={{ fontSize: "15px", fontWeight: "500" }}>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={`col-lg-5 order-lg-${imageOnLeft ? 1 : 2}`}>
        <div className="about-image position-relative">
          <img
            src={image}
            alt={`${title} - JDM Group`}
            className="wow fadeInLeft img-fluid rounded-4 shadow-sm"
            data-wow-delay=".3s"
            loading="lazy"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
      </div>
      <style jsx>{`
        .fa-check-circle {
          color: var(--theme);
        }
        .grid-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 10px;
        }
        .rounded-4 {
          border-radius: 1.25rem !important;
        }
      `}</style>
    </div>
  );
});

// Main Industry Component
const Industry = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="container py-5 text-center text-muted">
        No industry data available.
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="about-wrapper">
        {data.map((section, idx) => (
          <Section key={idx} idx={idx} {...section} />
        ))}
      </div>
    </div>
  );
};

export default memo(Industry);
