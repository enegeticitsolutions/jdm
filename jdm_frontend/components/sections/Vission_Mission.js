"use client";
import React, { memo } from "react";

// Utility to render markdown-like bold text
const renderDescription = (text) =>
  text?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

// ======================================================
// Reusable Section Component
// ======================================================
const Section = memo(({ title, content, listItems, image, isImageLeft }) => (
  <div className="section-card-container mb-5">
    <div className="row g-5 align-items-center justify-content-between">
      {/* Text Column */}
      <div className={`col-lg-7 order-lg-${isImageLeft ? 2 : 1}`}>
        <div className="about-content">
          <div className="section-title">
            <h2 className="wow fadeInUp font-weight-bold text-white mb-4" data-wow-delay=".2s">{title}</h2>
          </div>

          {content && (
            <p
              className="mt-3 leading-relaxed text-slate-300 wow fadeInUp"
              data-wow-delay=".4s"
              style={{ fontSize: "16px", color: "#e2e8f0", lineHeight: "1.75" }}
              dangerouslySetInnerHTML={{ __html: renderDescription(content) }}
            />
          )}

          {listItems && Array.isArray(listItems) && (
            <ul className="mt-4 wow fadeInUp" data-wow-delay=".4s" style={{ listStyle: "none", paddingLeft: 0 }}>
              {listItems.map((item, index) => (
                <li key={index} className="value-item d-flex align-items-start mb-3" style={{ fontSize: "15px", color: "#f8fafc" }}>
                  <i className="fas fa-check me-3 mt-1" aria-hidden="true" />
                  <span dangerouslySetInnerHTML={{ __html: renderDescription(item) }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Image Column OR Placeholder */}
      <div className={`col-lg-5 order-lg-${isImageLeft ? 1 : 2}`}>
        <div className="about-image text-center">
          {image ? (
            <img
              src={image}
              alt={`${title} - JDM Group`}
              className="wow fadeInLeft img-fluid rounded-4 shadow"
              data-wow-delay=".3s"
              loading="lazy"
              style={{ maxHeight: "350px", width: "100%", height: "auto", objectFit: "cover", borderRadius: "1rem" }}
            />
          ) : (
            // Placeholder to maintain zig-zag structure
            <div className="placeholder-box"></div>
          )}
        </div>
      </div>
    </div>

    <style jsx>{`
      .section-card-container {
        background: linear-gradient(135deg, #071f30 0%, #030f18 100%);
        border-radius: 20px;
        padding: 55px 50px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.08);
        position: relative;
        overflow: hidden;
      }
      .section-card-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 80% 20%, rgba(2, 132, 199, 0.15) 0%, transparent 60%);
        pointer-events: none;
      }
      .fa-check {
        color: #38bdf8; /* Bright cyan/blue tick */
        font-size: 16px;
      }
      .placeholder-box {
        width: 100%;
        height: 250px;
        background: transparent;
      }
      @media (max-width: 991px) {
        .section-card-container {
          padding: 35px 25px;
        }
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
      <div className="about-wrapper py-4">
        <>
          {sectionList.map((section, index) => {
            const { data } = section;
            const isImageLeft = index % 2 !== 0; // zig-zag logic

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
                image={section.type === "keyStrengths" ? "http://localhost:8000/media/about/keystrength/key_strenghts.png" : data.image_url || null}
                isImageLeft={isImageLeft}
              />
            );
          })}
        </>
      </div>
    </div>
  );
};

export default memo(VisionMissionFounder);
