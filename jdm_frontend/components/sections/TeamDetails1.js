"use client";

import React from "react";
import Link from "next/link";

/* ===== Helper ===== */
const renderDescription = (text) => {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

export default function TeamDetailsPage({ member }) {
  // You can fetch member by ID outside or pass as prop
  const data = member || {};

  

  return (
    <section className="team-details-section">
      <div className="container">
        <div className="team-details-items">

          {/* ===== IMAGE (1:1 RATIO) ===== */}
          <div className="details-image">
            <img
              src={data.image || "/assets/img/team/details-1.jpg"}
              alt={data.name || "Team member"}
            />
          </div>

          {/* ===== CONTENT ===== */}
          <div className="team-details-content">
            <h2 className="name">{data.name}</h2>
            <p className="role">{data.role}</p>

            <p
              className="bio"
              dangerouslySetInnerHTML={{
                __html: renderDescription(data.bio),
              }}
            />

            {data.phone && (
              <p>
                <strong>Phone:</strong>{" "}
                <Link href={`tel:${data.phone}`}>{data.phone}</Link>
              </p>
            )}

            {data.email && (
              <p>
                <strong>Email:</strong>{" "}
                <Link href={`mailto:${data.email}`}>{data.email}</Link>
              </p>
            )}

            {data.website && (
              <p>
                <strong>Website:</strong>{" "}
                <Link href={data.website}>{data.website}</Link>
              </p>
            )}

            {(data.social?.facebook ||
              data.social?.twitter ||
              data.social?.linkedin ||
              data.social?.youtube) && (
              <div className="social-icons">
                {data.social.facebook && (
                  <Link href={data.social.facebook}>
                    <i className="fab fa-facebook-f" />
                  </Link>
                )}
                {data.social.twitter && (
                  <Link href={data.social.twitter}>
                    <i className="fab fa-twitter" />
                  </Link>
                )}
                {data.social.linkedin && (
                  <Link href={data.social.linkedin}>
                    <i className="fab fa-linkedin-in" />
                  </Link>
                )}
                {data.social.youtube && (
                  <Link href={data.social.youtube}>
                    <i className="fab fa-youtube" />
                  </Link>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ===== PAGE STYLES ===== */}
      <style jsx>{`
        .team-details-section {
          padding: 80px 0;
        }

        .team-details-items {
          display: flex;
          gap: 50px;
          align-items: flex-start;
        }

        /* ===== IMAGE FIX (SAME RATIO) ===== */
        .details-image {
          width: 400px;
          aspect-ratio: 1 / 1;      /* ✅ SAME RATIO */
          // background: #f2f2f2;
          // border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .details-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;      /* ✅ NO FACE CUT */
        }

        /* ===== CONTENT ===== */
        .team-details-content {
          flex: 1;
        }

        .name {
          font-size: 30px;
          margin-bottom: 5px;
        }

        .role {
          color: #777;
          margin-bottom: 20px;
        }

        .bio {
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .social-icons a {
          margin-right: 12px;
          font-size: 18px;
          color: #333;
        }

        .social-icons a:hover {
          color: var(--theme);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 991px) {
          .team-details-items {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .details-image {
            width: 300px;
          }
        }
      `}</style>
    </section>
  );
}
