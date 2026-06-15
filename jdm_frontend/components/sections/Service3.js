"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GlobalServices({data}) {
  if(!data) return null;
  const services = data;
  console.log("Services:", services);
  const totalSlides = services.length;
  const columnsPerRow = totalSlides <= 8 ? totalSlides / 2 : 4;

  return (
    <section
      className="global-services-section service-section fix section-padding"
      id="services"
    >
      <div className="container">
        <div className="section-title text-center">
          <h2 className="wow fadeInUp" data-wow-delay=".2s">
            {services.heading}
          </h2>
        </div>
      </div>

      <div>
        <div
          className="services-grid"
          // style={{ display: "grid", gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`, gap: 0 }}
        >
          {services.items.map((service, index) => {
            const isVas = service.slug?.includes("value-added") || service.title?.toLowerCase().includes("value added");
            const targetUrl = isVas ? "/value-added-services" : `/service-details/${service.slug || service.id}`;
            return (
              <Link href={targetUrl} key={index}>
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
            );
          })}
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

        .service-item {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 10;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(${columnsPerRow}, 1fr);
          gap: 0px;
        }
        @media (max-width: 475px) {
          .services-grid{
            grid-template-columns:repeat(${columnsPerRow-1}, 1fr);
          }
        }
        .service-image {
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
          transform: scale(1.0);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--theme, rgba(255, 0, 0, 0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(100%);
          transition: transform 0.3s ease, opacity 0.3s ease;
          z-index: 2;
        }

        .overlay-content {
          text-align: center;
          padding: 10px;
        }

        .overlay-content p {
          margin: 0;
          color: white;
          text-transform: uppercase;
          font-size: 24px;
          font-weight: 600;
        }

        .overlay-content span {
          display: block;
          color: white;
          font-size: 18px;
          margin-top: 5px;
        }

        @media (max-width: 1200px) {
          .overlay-content p {
            font-size: 16px;
          }
          .overlay-content span {
            font-size: 12px;
          }
        }

        .overlay-content p:hover,
        .overlay-content span:hover {
          color: var(--theme2);
        }

        .service-item:hover .overlay {
          opacity: 85%;
          transform: translateY(0);
        }

        .service-item:hover .service-image {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
