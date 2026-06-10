"use client";
import React, { memo } from "react";

// Utility to render markdown-like bold text
const renderDescription = (text) =>
  text?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

// ======================================================
// Reusable Section Component
// ======================================================
const Section = memo(({ title, content, listItems, image }) => {
  const titleLower = title?.toLowerCase() || "";
  const isVision = titleLower.includes("vision");
  const isValues = titleLower.includes("values");
  const isMission = titleLower.includes("mission");
  const isStrengths = titleLower.includes("strengths");

  let cardStyle = {};
  if (isVision && image) {
    cardStyle = {
      backgroundImage: `url(${image})`,
    };
  } else if (isValues) {
    cardStyle = {
      backgroundImage: `linear-gradient(to right, rgba(3, 15, 24, 0.95) 0%, rgba(3, 15, 24, 0.7) 45%, rgba(3, 15, 24, 0.0) 75%), url('/assets/img/about/our-values-bg.png')`,
    };
  } else if (isMission) {
    cardStyle = {
      backgroundImage: `linear-gradient(to right, rgba(3, 15, 24, 0.95) 0%, rgba(3, 15, 24, 0.7) 45%, rgba(3, 15, 24, 0.0) 75%), url('/assets/img/about/our-mission-bg.png')`,
    };
  } else if (isStrengths) {
    cardStyle = {
      backgroundImage: `linear-gradient(to right, rgba(3, 15, 24, 0.95) 0%, rgba(3, 15, 24, 0.7) 45%, rgba(3, 15, 24, 0.0) 75%), url('/assets/img/about/our-strengths-bg.png')`,
    };
  } else {
    let background = "linear-gradient(135deg, #071f30 0%, #030f18 100%)";
    cardStyle = { background };
  }

  return (
    <div className={`section-card-container mb-5 ${isVision && image ? "has-bg-image" : ""} ${isValues ? "is-values" : ""} ${isMission ? "is-mission" : ""} ${isStrengths ? "is-strengths" : ""}`} style={cardStyle}>
      <div className="row g-5 align-items-center">
        {/* Text Column (Always on Left) */}
        <div className={isValues || isMission || isStrengths ? "col-lg-7" : "col-lg-8"} style={{ position: "relative", zIndex: 2 }}>
          <div className="about-content">
            <div className="section-title">
              <h2 className="wow fadeInUp section-card-title" data-wow-delay=".2s">{title}</h2>
            </div>

            {content && (
              <p
                className="mt-3 leading-relaxed wow fadeInUp section-card-text"
                data-wow-delay=".4s"
                dangerouslySetInnerHTML={{ __html: renderDescription(content) }}
              />
            )}

            {listItems && Array.isArray(listItems) && (
              <ul className="mt-4 wow fadeInUp" data-wow-delay=".4s" style={{ listStyle: "none", paddingLeft: 0 }}>
                {listItems.map((item, index) => (
                  <li key={index} className="value-item d-flex align-items-start mb-3">
                    <i className="fas fa-check me-3 mt-1" aria-hidden="true" />
                    <span dangerouslySetInnerHTML={{ __html: renderDescription(item) }} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Floating Seamless Image (Always on Right for others, only on mobile for Vision) */}
      {image && !isValues && !isMission && !isStrengths && (
        <div className={`about-image-container ${isVision ? "d-lg-none" : ""}`}>
          <img
            src={image}
            alt={`${title} - JDM Group`}
            className="wow fadeInRight"
            data-wow-delay=".3s"
            loading="lazy"
          />
        </div>
      )}

      <style jsx>{`
        .section-card-container {
          border-radius: 24px;
          padding: 60px 55px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          overflow: hidden;
        }
        .section-card-container.has-bg-image {
          background-color: #052238 !important;
          background-size: contain !important;
          background-position: right center !important;
          background-repeat: no-repeat !important;
          min-height: 380px;
          display: flex;
          align-items: center;
        }
        .section-card-container.is-values,
        .section-card-container.is-mission,
        .section-card-container.is-strengths {
          background-color: #030f18 !important;
          background-size: cover !important;
          background-position: right center !important;
          background-repeat: no-repeat !important;
          min-height: 400px;
          display: flex;
          align-items: center;
        }
        .section-card-container.has-bg-image .row,
        .section-card-container.is-values .row,
        .section-card-container.is-mission .row,
        .section-card-container.is-strengths .row {
          width: 100%;
        }
        .section-card-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .section-card-title {
          font-size: 44px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .section-card-text {
          font-size: 16px;
          color: #e2e8f0;
          line-height: 1.75;
        }
        .value-item {
          font-size: 15px;
          color: #f8fafc;
          line-height: 1.6;
        }
        .fa-check {
          color: #38bdf8; /* Bright cyan/blue tick */
          font-size: 16px;
        }
        .about-image-container {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 52%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }
        .about-image-container img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          object-position: right center;
          mix-blend-mode: screen;
          opacity: 0.95;
        }
        @media (max-width: 991px) {
          .section-card-container {
            padding: 35px 25px;
          }
          .section-card-container.has-bg-image {
            background-image: none !important;
            background: linear-gradient(135deg, #052335 0%, #000c14 100%) !important;
            min-height: auto;
            display: block;
          }
          .section-card-container.is-values,
          .section-card-container.is-mission,
          .section-card-container.is-strengths {
            background-size: cover !important;
            background-position: center right !important;
            min-height: auto;
            display: block;
          }
          .section-card-title {
            font-size: 32px;
            margin-bottom: 16px;
          }
          .about-image-container {
            position: relative;
            width: 100%;
            height: auto;
            margin-top: 30px;
            justify-content: center;
          }
          .about-image-container img {
            max-height: 220px;
            object-position: center;
          }
        }
      `}</style>
    </div>
  );
});

// ======================================================
// MAIN COMPONENT
// ======================================================
const VisionMissionFounder = ({ data }) => {
  console.log("VisionMissionFounder data:", data);

  const { mission, vision, values, keyStrengths } = data || {};

  // Build ordered sections to ensure zig-zag consistency
  const sectionList = [
    values?.is_active ? { type: "values", data: values } : null,
    vision?.is_active ? { type: "vision", data: vision } : null,
    mission?.is_active ? { type: "mission", data: mission } : null,
    keyStrengths ? { type: "keyStrengths", data: keyStrengths } : null,
  ].filter(Boolean);

  return (
    <div className="container">
      <div className="about-wrapper py-4">
        <>
          {sectionList.map((section, index) => {
            const { data } = section;

            let content = data.paragraph;
            let listItems = data.points;

            // If the section type is mission or vision, and paragraph has newlines, convert to bullet points
            if (content && (section.type === "mission" || section.type === "vision")) {
              const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
              if (lines.length > 1) {
                listItems = lines;
                content = null; // render as bullet list instead of plain paragraph
              }
            }

            return (
              <Section
                key={index}
                title={data.heading}
                content={content}
                listItems={listItems}
                image={data.image_url || null}
              />
            );
          })}
        </>
      </div>
    </div>
  );
};

export default memo(VisionMissionFounder);
