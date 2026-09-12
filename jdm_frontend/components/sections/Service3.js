"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GlobalServices({data}) {
  if(!data) return null;
  const services = data;

  return (
    <section
      className="global-services-section service-section fix section-padding"
      id="services"
    >
      <div className="container">
        <div className="section-title text-center mb-4">
          <h2 className="wow fadeInUp" data-wow-delay=".2s">
            {services.heading}
          </h2>
        </div>
      </div>

      <div>
        <div className="services-grid">
          {services.items.map((service, index) => (
            <Link href={`/service-details/${service.id}`} key={index}>
              <div className="service-item cursor-pointer">
                <div
                  className="service-image"
                  role="img"
                  aria-label={service.title}
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <p>{service.title}</p>
                    <span>more →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .global-services-section {
          padding: 50px 0 0px;
        }

        .section-title {
          text-align: center;
          font-size: 36px;
          color: #4a2c2a;
          text-transform: uppercase;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0px;
          width: 100%;
        }

        .service-item {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 10;
          min-height: 180px;
        }

        .service-image {
          width: 100%;
          height: 100%;
          transition: transform 0.4s ease;
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(181, 39, 31, 0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(100%);
          transition: transform 0.3s ease, opacity 0.3s ease;
          padding: 15px;
        }

        .overlay-content {
          text-align: center;
          max-width: 92%;
        }

        .overlay-content p {
          margin: 0;
          color: #ffffff;
          text-transform: uppercase;
          font-size: clamp(15px, 1.8vw, 24px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }

        .overlay-content span {
          display: inline-block;
          color: #ffffff;
          font-size: clamp(12px, 1.3vw, 18px);
          margin-top: 6px;
          font-weight: 500;
        }

        .service-item:hover .overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .service-item:hover .service-image {
          transform: scale(1.12);
        }

        /* Responsiveness for Tablets (991px and below) */
        @media (max-width: 991px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .service-item {
            aspect-ratio: 16 / 9;
            min-height: 160px;
          }
        }

        /* Responsiveness for Mobile Devices (575px and below) */
        @media (max-width: 575px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .service-item {
            aspect-ratio: 4 / 3;
            min-height: 130px;
          }
          .overlay {
            padding: 8px;
          }
          .overlay-content p {
            font-size: 13px;
          }
          .overlay-content span {
            font-size: 11px;
            margin-top: 3px;
          }
        }

        /* Small Mobile Devices (380px and below) */
        @media (max-width: 380px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .service-item {
            aspect-ratio: 16 / 9;
            min-height: 180px;
          }
          .overlay-content p {
            font-size: 18px;
          }
          .overlay-content span {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
