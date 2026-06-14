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
      1350: { slidesPerView: 3 },
      991: { slidesPerView: 3 },
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

      <section className="py-5 branch-section position-relative">
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
                  className="card border-0 shadow overflow-hidden position-relative mx-auto"
                  style={{
                    height: "260px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    maxWidth: "480px",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    className="card-img-top position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      backgroundImage: `url(${branch.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 90%)" }} 
                  />
                  <div className="card-body position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end text-white pt-4 px-4 pb-2">
                    <h5 className="card-title m-0 fw-bold fs-4 pb-1">{branch.city}</h5>
                    <p className="card-text mb-0">
                      {branch.address}
                      <br />
                      {branch.phone.map((phone, i) => (
                        <span key={i} className="d-block mt-1">
                          <i className="fas fa-phone me-2" style={{ color: "#df1119" }} />{phone}
                        </span>
                      ))}
                      <span className="d-block mt-1">
                        <i className="fas fa-envelope me-2" style={{ color: "#ffffff" }} />{branch.email}
                      </span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation Buttons on the absolute sides of the section */}
        <button className="array-prev custom-nav-btn prev-btn">
          <i className="fas fa-chevron-left" />
        </button>
        <button className="array-next custom-nav-btn next-btn">
          <i className="fas fa-chevron-right" />
        </button>
      </section>

      <style jsx>{`
        .branch-section {
          background-color: #b5271f;   /* updated background color */
        }
        .card {
          height: 260px;
          width: 100%;
        }
        .card:hover{
          cursor: grab;
        }
        .card-img-top {
          transition: transform 0.3s ease;
        }
        .card:hover .card-img-top{
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
        }
        .swiper-container {
          padding-bottom: 20px;
        }
        .card-text{
          font-size: 13px;
          line-height: 1.5;
        }
        .custom-nav-btn {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          width: 45px;
          height: 80px;
          background-color: rgba(28, 37, 56, 0.85); /* Dark blue/gray matching header */
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-size: 20px;
        }
        .custom-nav-btn:hover {
          background-color: rgba(28, 37, 56, 1);
          color: var(--theme2); /* Yellow highlight on hover */
          cursor: pointer;
        }
        .prev-btn {
          left: 0;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .next-btn {
          right: 0;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        @media (max-width: 767px) {
          .custom-nav-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default IndianBranches;
