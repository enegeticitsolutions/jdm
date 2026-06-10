"use client";
import Link from "next/link";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const defaultImages = [
  "/assets/img/brand/Associations/Domestic/1.png",
  "/assets/img/brand/Associations/Domestic/2.png",
  "/assets/img/brand/Associations/Domestic/3.png",
  "/assets/img/brand/Associations/Domestic/4.png",
  "/assets/img/brand/Associations/Domestic/5.png",
  "/assets/img/brand/Associations/Domestic/6.png",
  "/assets/img/brand/Associations/Domestic/7.png",
];

export default function Brand1({
  alt,
  heading,
  images = defaultImages,
  know_more,
  to,
  border = false,
  pagination,
  layout = "slider",
  squareCards = false,
  showNameStrip = false,
}) {

  console.log("Brand1 images: ", images);
  // Fallback for empty images
  if (!images?.length) {
    console.log("No images provided to Brand1 component");
    return <div className="text-center p-3">No partner logos available</div>;
  }
  console.log("image length", images.length);
  console.log("images", images);

  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    spaceBetween: 30,
    speed: 800,
    loop: images.length > 1,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    pagination: pagination
      ? { clickable: true }
      : false,
    breakpoints: {
      1350: { slidesPerView: Math.min(6, images.length - 1) },
      991: { slidesPerView: Math.min(6, images.length - 1) },
      767: { slidesPerView: Math.min(5, images.length - 1) },
      575: { slidesPerView: Math.min(4, images.length - 1) },
      0: { slidesPerView: 3 },
    },
  };

  return (
    <div className={`brand-section fix ${alt ? "pt-0 section-bg-2" : ""}`}>
      <div className="py-3 container brand-section-wrapper">
        <div className="section-title text-center">
          <h2 className="wow fadeInUp" data-wow-delay=".2s">
            {heading}
          </h2>
        </div>
        {layout === "grid" ? (
          <div className="brand-grid">
            {images.map((image, index) => {
              const imageSrc = typeof image === "string" ? image : (image.logo || image.src);
              const imageTitle = typeof image === "object" ? image.title : "";
              const imageAlt = typeof image === "string" ? `Partner logo ${index + 1}` : (image.alt || `Partner logo ${index + 1}`);

              return (
                <div
                  key={index}
                  className="brand-image center"
                  style={{
                    background: "transparent",
                    backgroundColor: "transparent",
                    padding: imageTitle ? "20px 16px 16px 16px" : "15px"
                  }}
                >
                  <div
                    className="logo-wrapper"
                    style={{
                      height: imageTitle ? "160px" : "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      position: "relative"
                    }}
                  >
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={220}
                      height={160}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        maxHeight: "160px",
                        maxWidth: "100%",
                        mixBlendMode: "multiply",
                        filter: "contrast(1.1)"
                      }}
                      unoptimized={true}
                      loading="lazy"
                    />
                  </div>
                  {imageTitle && (
                    <div
                      className="brand-title"
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginTop: "10px",
                        textAlign: "center",
                        lineHeight: "1.4",
                        width: "100%",
                        minHeight: "36px"
                      }}
                    >
                      {imageTitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="swiper brand-slider">
            <Swiper {...swiperOptions} className="swiper-wrapper">
              {images.map((image, index) => {
                const imageSrc = typeof image === "string" ? image : (image.logo || image.src);
                const imageTitle = typeof image === "object" ? image.title : "";
                const imageAlt = typeof image === "string" ? `Partner logo ${index + 1}` : (image.alt || `Partner logo ${index + 1}`);

                return (
                  <SwiperSlide
                    key={index}
                    className="swiper-slide"
                    style={{ background: "transparent", backgroundColor: "transparent" }}
                  >
                    <div
                      className={`brand-image center${squareCards ? " brand-image-square" : showNameStrip ? " brand-image-with-title" : ""}`}
                      style={{
                        background: "transparent",
                        backgroundColor: "transparent",
                        padding: squareCards ? "10px" : showNameStrip ? "12px 14px 0 14px" : "14px"
                      }}
                    >
                      {/* Logo area — fixed height so logos stay large */}
                      <div
                        className="logo-wrapper"
                        style={{
                          height: squareCards ? "90px" : "140px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          position: "relative"
                        }}
                      >
                        <Image
                          src={imageSrc}
                          alt={imageAlt}
                          width={squareCards ? 150 : 200}
                          height={squareCards ? 90 : 140}
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                            maxHeight: squareCards ? "90px" : "140px",
                            maxWidth: "100%",
                            mixBlendMode: "multiply",
                            filter: "contrast(1.1)"
                          }}
                          unoptimized={true}
                          loading="lazy"
                        />
                      </div>
                      {/* Name strip — only shown for Associations / Accreditations */}
                      {showNameStrip && (
                        <div
                          className="brand-title-strip"
                          style={{
                            borderTop: "1px solid #e5e7eb",
                            marginTop: "10px",
                            paddingTop: "8px",
                            paddingBottom: "10px",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#1f2937",
                            textAlign: "center",
                            lineHeight: "1.4",
                            width: "100%",
                            minHeight: "46px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {imageTitle || ""}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
        {know_more && to && (
          <div className="know-more-button p-4 flex justify-content-center">
            <Link
              href={`${to}`}
              className="theme-btn wow fadeInUp"
              data-wow-delay=".2s"
            >
              {know_more} <i className="fa-regular fa-arrow-right" />
            </Link>
          </div>
        )}
      </div>
      <style jsx global>{`
        .brand-section .swiper-slide {
          height: auto !important;
          display: flex !important;
          background: transparent !important;
          background-color: transparent !important;
        }
        .brand-section img {
          background: transparent !important;
          background-color: transparent !important;
          mix-blend-mode: multiply !important;
        }
        .swiper-wrapper {
          mix-blend-mode: multiply !important;
          display: flex !important;
        }
        .brand-image {
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #ffffff !important;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          height: 100%;
          width: 100%;
          min-height: 175px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          mix-blend-mode: normal !important;
        }
        .brand-image-with-title {
          min-height: 230px !important;
          padding: 0 !important;
        }
        .brand-section .swiper-slide .brand-image-with-title {
          display: flex;
          flex-direction: column;
        }
        .brand-image-square {
          min-height: 120px !important;
          justify-content: center !important;
        }
        .brand-image:hover {
          border-color: var(--theme);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }
        @media (max-width:475px){
          .brand-image {
            padding: 8px 6px;
            min-height: 130px;
            height: auto;
          }
          .brand-image-with-title {
            min-height: 180px !important;
          }
          .brand-image-square {
            min-height: 100px !important;
          }
        }
        .brand-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px 20px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 0;
        }
        .brand-grid .brand-image {
          width: 220px;
          min-height: 250px !important;
          flex-grow: 0;
          flex-shrink: 0;
        }
        @media (max-width: 575px) {
          .brand-grid {
            gap: 16px 12px;
          }
          .brand-grid .brand-image {
            width: calc(50% - 6px);
          }
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
        }
        .swiper-pagination{
          bottom: -35px !important;
        }
        .swiper-pagination-bullet-active {
          background: var(--theme);
        }
        .brand-section-wrapper {
          padding-bottom: 40px !important;
          overflow: hidden;
        }
        .swiper{
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
}