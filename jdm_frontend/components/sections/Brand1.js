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
        <div className="swiper brand-slider">
          <Swiper {...swiperOptions} className="swiper-wrapper">
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide"
                style={{ background: "transparent", backgroundColor: "transparent" }}
              >
                <div
                  className="brand-image center"
                  style={{
                    background: "transparent",
                    backgroundColor: "transparent"
                  }}
                >
                  <Image
                    src={typeof image === "string" ? image : image.src}
                    alt={
                      typeof image === "string"
                        ? `Partner logo ${index + 1}`
                        : image.alt || `Partner logo ${index + 1}`
                    }
                    width={130}
                    height={100}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "auto",
                      mixBlendMode: "multiply",
                      filter: "contrast(1.1)"
                    }}
                    unoptimized={true}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
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
       .brand-section .swiper-slide,
        .brand-section img {
          background: transparent !important;
          background-color: transparent !important;
          mix-blend-mode: multiply !important;
        }
        .swiper-wrapper {
          mix-blend-mode: multiply !important;
        }
        .brand-image {
          padding: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ffffff !important;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          height: 90px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          mix-blend-mode: normal !important;
        }
        .brand-image:hover {
          border-color: var(--theme);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }
        @media (max-width:475px){
          .brand-image {
            padding: 5px;
            height: 70px;
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