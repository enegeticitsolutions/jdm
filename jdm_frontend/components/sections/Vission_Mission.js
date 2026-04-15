"use client";
import React, { memo } from "react";

// Utility to render markdown-like bold text
const renderDescription = (text) =>
  text?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

// ======================================================
// Reusable Section Component
// ======================================================
const Section = memo(({ title, content, listItems, image, isImageLeft }) => (
  <div className="row g-4 p-4 justify-content-between align-items-center">
    {/* Text Column */}
    <div className={`col-lg-7 order-lg-${isImageLeft ? 2 : 1}`}>
      <div className="about-content">
        <div className="section-title">
          <h2 className="wow fadeInUp" data-wow-delay=".2s">{title}</h2>
        </div>

        {content && (
          <p
            className="mt-3 mt-md-0 wow fadeInUp"
            data-wow-delay=".4s"
            dangerouslySetInnerHTML={{ __html: renderDescription(content) }}
          />
        )}

        {listItems && Array.isArray(listItems) && (
          <ul className="mt-3 wow fadeInUp text-muted" data-wow-delay=".4s">
            {listItems.map((item, index) => (
              <li key={index} className="value-item d-flex align-items-center">
                <i className="fas fa-check-circle me-2"></i>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {/* Image Column OR Placeholder */}
    <div className={`col-lg-5 order-lg-${isImageLeft ? 1 : 2}`}>
      <div className="about-image">
        {image ? (
          <img
            src={image}
            alt={`${title} - JDM Group`}
            className="wow fadeInLeft img-fluid"
            data-wow-delay=".2s"
            loading="lazy"
          />
        ) : (
          // Placeholder to maintain zig-zag structure
          <div className="placeholder-box"></div>
        )}
      </div>
    </div>

    <style jsx>{`
      .fa-check-circle {
        color: var(--theme);
      }
      .placeholder-box {
        width: 100%;
        height: 250px;
        background: transparent; /* invisible placeholder */
      }
    `}</style>
  </div>
));

// ======================================================
// MAIN COMPONENT
// ======================================================
const VisionMissionFounder = ({ data }) => {
  console.log("VisionMissionFounder data:", data);

  const { mission, vision, values, keyStrengths } = data || {};

  // Build ordered sections to ensure zig-zag consistency
  const sectionList = [
    mission?.is_active ? { type: "mission", data: mission } : null,
    vision?.is_active ? { type: "vision", data: vision } : null,
    values?.is_active ? { type: "values", data: values } : null,
    keyStrengths ? { type: "keyStrengths", data: keyStrengths } : null,
  ].filter(Boolean);

  return (
    <div className="container">
      <div className="about-wrapper">
        <>
          {sectionList.map((section, index) => {
            const { data } = section;
            const isImageLeft = index % 2 !== 0; // zig-zag logic

            return (
              <Section
                key={index}
                title={data.heading}
                content={data.paragraph}
                listItems={data.points}
                image={data.image_url || null} // keyStrengths has no image
                isImageLeft={isImageLeft}
              />
            );
          })}
        </>
      </div>

      <style jsx>{`
        .about-content {
          transition: all 0.3s ease;
        }
        .section-title h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        .value-item {
          font-size: 14px;
        }
        .value-item:hover {
          color: #333;
        }

        @media (max-width: 767px) {
          .row.align-items-center {
            flex-direction: column-reverse;
          }
          .col-lg-5,
          .col-lg-7 {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(VisionMissionFounder);
