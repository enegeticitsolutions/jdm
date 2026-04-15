"use client";
import React, { memo } from "react";

// Section component
const Section = memo(({ title, type, content, list_items, image, is_image_left }) => (
  <div className="row g-4 p-4 justify-content-between align-items-center">
    <div className={`col-lg-7 order-lg-${is_image_left ? 2 : 1}`}>
      <div className="about-content">
        <div className="section-title">
          <h2 className="wow fadeInUp" data-wow-delay=".2s">{title}</h2>
        </div>
        {type === "para" && content && (
          <p
            className="mt-3 mt-md-0 wow fadeInUp"
            data-wow-delay=".4s"
            dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
          />
        )}
        {type === "bullet" && list_items && (
          <ul className="mt-3 wow fadeInUp text-muted" data-wow-delay=".4s">
            {list_items.map((item, index) => (
              <li key={index} className="value-item d-flex align-items-center">
                <i className="fas fa-check-circle me-2" aria-hidden="true" />
                <span className="text-dark">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <div className={`col-lg-5 order-lg-${is_image_left ? 1 : 2}`}>
      <div className="about-image">
        <img
          src={image}
          alt={`${title} - JDM Group`}
          className="wow fadeInLeft img-fluid"
          data-wow-delay=".2s"
          loading="lazy"
        />
      </div>
    </div>
    <style jsx>{`
      .fa-check-circle {
        color: var(--theme);
      }
    `}</style>
  </div>
));

// Main Industry Component
const Industry = ({data}) => {
  return (
    <div className="container">
      <div className="about-wrapper">
        {console.log("Industry data:", data)}
        {data.map((section, idx) => (
          <Section key={idx} {...section} />
        ))}
      </div>
    </div>
  );
};

export default memo(Industry);
