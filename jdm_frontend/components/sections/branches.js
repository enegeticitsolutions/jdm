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
    spaceBetween: 30,
    speed: 500,
    loop: true,
    autoplay: { delay: 3000 },
    breakpoints: {
      1350: { slidesPerView: 4 },
      991: { slidesPerView: 4 },
      767: { slidesPerView: 2 },
      575: { slidesPerView: 1 },
      0: { slidesPerView: 1 },
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
    <>
      <Head>
        <title>JDM India Branches</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
      </Head>

      <section className="py-5 branch-section">
        <div className="container">
          <div className="section-title text-center">
            <h2 
              className="wow fadeInUp" 
              data-wow-delay=".2s"
              style={{ color: "#ffffff" }}   // heading white
            >
              {data.heading || "Our Locations"}
            </h2>
          </div>
          
          <Swiper {...swiperOptions} className="swiper-container">
            {data.items.map((branch, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div
                  className="card border-0 shadow h-100 overflow-hidden position-relative mx-auto"
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    maxWidth: "400px",
                  }}
                >
                  <div
                    className="card-img-top position-relative"
                    style={{
                      height: "200px",
                      backgroundImage: `url(${branch.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-50" />
                  </div>
                  <div className="card-body position-absolute d-flex flex-column justify-content-end text-white pt-5 p-4">
                    <h5 className="card-title m-0 fw-bold fs-4 pb-1">{branch.city}</h5>
                    <p className="card-text">
                      {branch.address}
                      <br />
                      {branch.phone.map((phone, i) => (
                        <span key={i} className="d-block">
                          📞 {phone}
                        </span>
                      ))}
                      <span className="d-block">✉️ {branch.email}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="array-button d-flex justify-content-center mt-4">
            <button className="array-prev h1p me-3">
              <i className="fa-regular fa-arrow-left-long" />
            </button>
            <button className="array-next h1n">
              <i className="fa-regular fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .branch-section {
          background-color: #b5271f;   /* updated background color */
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
          line-height: 1.5;
        }
      `}</style>
    </>
  );
};

export default IndianBranches;
