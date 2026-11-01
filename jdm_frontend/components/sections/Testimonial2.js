"use client"
import { useState, useEffect } from "react";
// import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper options remain unchanged
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
    nextEl: ".array-prev",
    prevEl: ".array-next",
  },
  breakpoints: {
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

export default function Testimonial2() {
  const [testimonials, setTestimonials] = useState([]); // Initialize with empty array


  // Fetch testimonials data from API on mount
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_V1 || 'https://api.jdmgroups.com/api/v1';

    const fetchTestimonialsData = async () => {
      try {
        const response = await fetch(`${apiUrl}/testimonials/`);
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Error fetching testimonials data:", error);
      }
    };

    fetchTestimonialsData();
  }, []); // Runs once on mount

  return (
    <>
      <section className="testimonial-section-2 fix section-padding">
        <div className="container">
          <div className="section-title text-center">
            {/* <h6 className="wow fadeInUp">
              <i className="fa-regular fa-arrow-left-long" />
              testimonial
              <i className="fa-regular fa-arrow-right-long" />
            </h6> */}
            <h2 className="wow fadeInUp" data-wow-delay=".2s">
              What our client say
            </h2>
          </div>
          {testimonials.length > 0 ? (
            <>
              <div className="array-button">
                <button className="array-prev">
                  <i className="fa-solid fa-arrow-left-long" />
                </button>
                <button className="array-next">
                  <i className="fa-solid fa-arrow-right-long" />
                </button>
              </div>
              <div className="swiper testimonial-slider-2">
                <Swiper {...swiperOptions} className="swiper-wrapper">
                  {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <div className={`testimonial-card-items ${index % 2 === 1 ? 'style-2' : ''}`}>
                        <div className="shape-img">
                          <img
                            src={`assets/img/testimonial/shape-${index % 2 === 0 ? 'left' : 'right'}.png`}
                            alt="img"
                          />
                        </div>
                        <p>{testimonial.text}</p>
                        <div className="client-info-items">
                          <div className="client-info">
                            <img src={testimonial.image || "assets/img/testimonial/default-client.png"} alt={testimonial.name} />
                            <div className="content">
                              <h4>{testimonial.name}</h4>
                              <span>{testimonial.position}</span>
                              <div className="star">
                                {Array.from({ length: testimonial.rating || 5 }, (_, i) => (
                                  <i key={i} className="fa-solid fa-star" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <img src={testimonial.companyImage || "assets/img/testimonial/default-company.png"} alt="Company Logo" />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          ) : (
            <div className="text-center mt-5">
              <p>No testimonials available at the moment. Please check back later!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}