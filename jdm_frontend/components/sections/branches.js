'use client';
import React from "react";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const IndianBranches = ({data}) => {
  if(!data) return null;
  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    spaceBetween: 24,
    speed: 500,
    loop: true,
    autoplay: { delay: 3000 },
    breakpoints: {
      1200: { slidesPerView: 4, spaceBetween: 24 },
      992: { slidesPerView: 3, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 16 },
      576: { slidesPerView: 1, spaceBetween: 12 },
      0: { slidesPerView: 1, spaceBetween: 10 },
    },
    pagination: {
      el: ".dot",
      clickable: true,
    },
    navigation: {
      nextEl: ".array-next",
      prevEl: ".array-prev",
    },
  };

  return (
    <section className="py-5 branch-section overflow-hidden">
      <div className="container overflow-hidden">
        <div className="section-title text-center mb-4">
          <h2 
            className="wow fadeInUp" 
            data-wow-delay=".2s"
            style={{ color: "#ffffff" }}   // heading white
          >
            {data.heading || "Our Locations"}
          </h2>
        </div>
        
        <div className="swiper-branch-wrapper w-100 overflow-hidden">
          <Swiper {...swiperOptions} className="swiper-container">
            {data.items.map((branch, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div
                  className="card border-0 shadow h-100 overflow-hidden position-relative mx-auto branch-card"
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    maxWidth: "100%",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    className="card-img-top position-relative branch-card-img"
                    style={{
                      backgroundImage: `url(${branch.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)" }} />
                  </div>
                  <div className="card-body position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end text-white p-3 p-sm-4">
                    <h5 className="card-title m-0 fw-bold fs-4 pb-1 text-white">{branch.city}</h5>
                    <p className="card-text mb-0">
                      {branch.address}
                      <br />
                      {branch.phone.map((phone, i) => (
                        <span key={i} className="d-block mt-1">
                          📞 {phone}
                        </span>
                      ))}
                      <span className="d-block mt-1">✉️ {branch.email}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="array-button d-flex justify-content-center mt-4">
          <button className="array-prev h1p me-3">
            <i className="fa-regular fa-arrow-left-long" />
          </button>
          <button className="array-next h1n">
            <i className="fa-regular fa-arrow-right-long" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .branch-section {
          background-color: #b5271f;   /* updated background color */
          overflow: hidden;
          width: 100%;
          max-width: 100%;
        }
        .swiper-branch-wrapper {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .branch-card {
          width: 100%;
          max-width: 100%;
        }
        .branch-card-img {
          height: 250px;
        }
        @media (max-width: 575px) {
          .branch-card-img {
            height: 220px;
          }
          .card-text {
            font-size: 11px;
            line-height: 1.35;
          }
          .card-title {
            font-size: 1.15rem !important;
          }
        }
        .card:hover{
          cursor: grab;
        }
        .card:hover .card-img-top{
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .swiper-container {
          padding-bottom: 40px;
        }
        .branch-place {
          padding: 0px 8px 0px;
          font-size: 12px;
          text-align: right;
          width: fit-content;
          align-self: flex-end;
        }
        .card-text{
          font-size: 12px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 1px 3px rgba(0,0,0,0.7);
        }
        .card-title {
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }
      `}</style>
    </section>
  );
};

export default IndianBranches;
