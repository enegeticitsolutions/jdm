"use client";
// import "swiper/css";
import Link from "next/link";
import { services } from "@/util/services";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useServiceData } from "@/hooks/useServiceData";
import Loading from "@/app/loading";
// import { us } from "@tanstack/react-query";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  spaceBetween: 30,
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".array-next",
    prevEl: ".array-prev",
  },
  breakpoints: {
    1399: {
      slidesPerView: 4,
    },
    1199: {
      slidesPerView: 4,
    },
    991: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 3,
    },
    575: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

export default function Service1() {
  const { data, isLoading, error } = useServiceData();
  if (isLoading) return <Loading />;

  console.log("datadatadata: ", data[0].image);
  return (
    <>
      <section
        className="service-section fix bg-cover"
        // style={{ backgroundImage: 'url("assets/img/service/service-bg.jpg")' }}
      >
        {/* <div className="container">
        </div> */}
        <div className="container-fluid">
          <div className="swiper service-slider">
            <Swiper {...swiperOptions} className="swiper-wrapper">
              {data.map((service, index) => {
                const isVas = service.slug?.includes("value-added") || service.title?.toLowerCase().includes("value added");
                const targetUrl = isVas ? "/value-added-services" : `/service-details/${service.slug || service.id}`;
                return (
                  <SwiperSlide key={service.id} className="swiper-slide">
                    <Link
                      href={targetUrl}
                      className="service-box-items"
                    >
                      <div className="service-thumb">
                        <img src={service.image} alt={service.title} />
                        {/* <div className="icon">
                          <i className={service.icon} />
                        </div> */}
                      </div>
                      <div className="service-content text-center">
                        {/* <h2 className="number">{String(index + 1).padStart(2, "0")}</h2> */}
                        <h3>
                          <Link href={targetUrl}>
                            {service.title}
                          </Link>
                        </h3>
                        {/* <p>{service.description}</p> */}
                        {/* <Link href={targetUrl} className="link-btn">
                          Explore More <i className="fa-solid fa-arrow-right" />
                        </Link> */}
                        <button
                          href={targetUrl}
                          className="theme-btn bg-white team-btn text-capitalize"
                        >
                          Read More <i className="fa-regular fa-arrow-right" />
                        </button>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* Navigation Buttons */}
            <div className="array-button d-flex justify-content-center mt-4">
              <button className="array-prev h1p me-3">
                <i className="fa-regular fa-arrow-left-long" />
              </button>
              <button className="array-next h1n">
                <i className="fa-regular fa-arrow-right-long" />
              </button>
            </div>
            {/* Pagination Dots */}
            <div className="dot swiper-pagination"></div>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        .link-btn {
          display: inline-flex;
          align-items: center;
          color: var(--theme, #f59e0b);
          text-decoration: none;
          font-weight: 500;
          margin-top: 10px;
        }
        .link-btn:hover {
          color: #e08e00;
        }
        .link-btn i {
          margin-left: 5px;
        }
      `}</style>
    </>
  );
}
