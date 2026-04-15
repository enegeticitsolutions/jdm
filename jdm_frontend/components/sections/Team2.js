// "use client";
// import React from "react";
// import Link from "next/link";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css"; // Uncomment if using Swiper CSS
// import { defaultTeamMembers } from "@/util/teamMembers";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";

// // Custom styles combining Team2 and Service section styles
// const customStyles = `
//   .card-hover {
//     position: relative;
//     overflow: hidden;
//     transition: transform 0.3s ease;
//     height: 100%;
//   }
//   .social-icon {
//     transition: color 0.3s ease;
//     font-size: 1.5rem;
//     margin: 0 0.5rem;
//   }

//   .social-icon:hover {
//     color: #0dcaf0 !important; /* Bootstrap's info color */
//   }

//   .swiper-slide {
//     height: auto;
//     display: flex;
//     align-items: stretch;
//   }

//   .swiper-slide .card-hover {
//     width: 100%;
//     height: 100%;
//   }

//   /* Service section-inspired card styling */
//   .team-box-items {
//     margin-top: 30px;
//     text-align: center;
//     height: 100%;
//   }

//   .team-box-items .service-thumb {
//     padding: 15px;
//     position: relative;
//   }

//   .team-box-items .service-thumb img {
//     width: 100%;
//     height: 250px;
//     object-fit: cover;
//   }

//   .team-box-items .service-thumb .icon {
//     position: absolute;
//     bottom: 30px;
//     left: 40px;
//     width: 68px;
//     height: 68px;
//     text-align: center;
//     background-color: var(--white);
//     box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.06);
//     padding: 14px;
//     font-size: 30px;
//     color: var(--theme);
//   }

//   .team-box-items .service-content {
//     padding: 0 30px 30px 30px;
//     position: relative;
//   }

//   .team-box-items .service-content .number {
//     text-align: right;
//     -webkit-text-stroke: 1px rgba(102, 102, 102, 0.5);
//     -webkit-text-fill-color: transparent;
//     transition: all 0.4s ease-in-out;
//     font-size: 50px;
//     font-weight: 700;
//     position: absolute;
//     right: 30px;
//     top: -50px;
//   }

//   .team-box-items .service-content .number:hover {
//     -webkit-text-stroke: 1px rgba(245, 91, 31, 0.5);
//   }

//   .team-box-items .service-content h3 {
//     margin-bottom: 5px;
//     font-size: 20px;
//     color: var(--text);
//   }
//   .team-box-items .service-content p{
//     margin-bottom: 10px;
//   }
//   .team-box-items .service-content .theme-btn {
//     padding: 16px;
//     font-size: 14px;
//   }
//   .team-box-items .service-content h3 a:hover {
//     color: var(--theme);
//   }

//   .team-box-items:hover .service-content .number {
//     -webkit-text-stroke: 1px rgba(245, 91, 31, 0.5);
//   }

//   .team-box-items .card-overlay {
//     z-index: 10; /* Ensure overlay is above other elements */
//   }
// `;

// const swiperOptions = {
//   modules: [Autoplay, Pagination, Navigation],
//   spaceBetween: 30,
//   speed: 2000,
//   loop: true,
//   autoplay: {
//     delay: 2000,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".dot",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".array-next",
//     prevEl: ".array-prev",
//   },
//   breakpoints: {
//     1399: {
//       slidesPerView: 4,
//     },
//     1199: {
//       slidesPerView: 4,
//     },
//     991: {
//       slidesPerView: 3,
//     },
//     767: {
//       slidesPerView: 3,
//     },
//     575: {
//       slidesPerView: 2,
//     },
//     0: {
//       slidesPerView: 1,
//     },
//   },
// };

// const renderDescription = (text) => {
//   return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
// };

// export default function TeamSlider({heading}) {


//   const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);

//   return (
//     <>
//       <style jsx>{customStyles}</style>
//       <section className="service-section team-section fix section-padding bg-cover">
//         <div className="container">
//           <div className="section-title text-center">
//             <h2 className="wow fadeInUp" data-wow-delay=".2s">
//               {/* Our Leadership Team */}
//               {heading}
//             </h2>
//           </div>
//         </div>
//         <div className="container-fluid">
//           <div className="swiper team-slider">
//             <Swiper {...swiperOptions} className="swiper-wrapper">
//               {/* {console.log("Team members data:", teamMembers)} */}
//               {teamMembers.map((member, index) => (
//                 // console.log("Rendering team member:", member),
//                 <SwiperSlide key={member.id} className="swiper-slide">
//                   <Link href={`/team-details/${member.id}`} className="card-hover">
//                     <div className="team-box-items">
//                       <div className="service-thumb">
//                         <img
//                           src={member.image}
//                           className="card-img-top"
//                           alt={member.name}
//                         />
//                         {/* <div className="icon">
//                           <i className="fa-solid fa-user" />
//                         </div> */}
//                       </div>
//                       <div className="service-content">
//                         {/* <h2 className="number">{String(index + 1).padStart(2, "0")}</h2> */}
//                         <h3>
//                           <span>{member.name}</span>
//                         </h3>
//                         <p>{member.excerpt}</p>
//                         <button href={`/team-details/${member.id}`} className="theme-btn bg-white team-btn text-capitalize">Read More <i className="fa-regular fa-arrow-right" /></button>
//                       </div>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             <div className="array-button d-flex justify-content-center mt-4">
//               <button className="array-prev h1p me-3">
//                 <i className="fa-regular fa-arrow-left-long" />
//               </button>
//               <button className="array-next h1n">
//                 <i className="fa-regular fa-arrow-right-long" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { defaultTeamMembers } from "@/util/teamMembers";

const customStyles = `
  /* ===== Swiper Layout Fix ===== */
  .swiper-slide {
    height: auto;
    display: flex;
  }

  /* ===== Card Layout ===== */
  .card-hover {
    width: 100%;
    height: 100%;
  }

  .team-box-items {
    margin-top: 30px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* ===== Image Wrapper (1:1 FIX) ===== */
  .team-box-items .service-thumb {
  position: relative;
  width: 80%;                 /* ✅ half the size */
  aspect-ratio: 1 / 1;
  margin: 0 auto;             /* center horizontally */
  overflow: hidden;
  padding: 0;
  border-radius: 3px;
}


  .team-box-items .service-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;        /* ✅ uniform crop */
    object-position: top center; /* keeps face visible */
  }

  /* ===== Content ===== */
  .team-box-items .service-content {
    padding: 20px 30px 30px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
  }

  .team-box-items .service-content h3 {
    font-size: 20px;
    margin-bottom: 5px;
    color: var(--text);
  }

  .team-box-items .service-content p {
    margin-bottom: 10px;
  }

  .team-box-items .service-content .theme-btn {
    padding: 14px;
    font-size: 14px;
  }

  .team-box-items:hover .service-content h3 {
    color: var(--theme);
  }
`;


const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  spaceBetween: 30,
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".dot",
    clickable: true,
  },
  navigation: {
    nextEl: ".array-next",
    prevEl: ".array-prev",
  },
  breakpoints: {
    1399: { slidesPerView: 4 },
    1199: { slidesPerView: 4 },
    991: { slidesPerView: 3 },
    767: { slidesPerView: 2 },
    575: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
};

export default function TeamSlider({ heading }) {
  const [teamMembers] = useState(defaultTeamMembers);

  return (
    <>
      <style jsx>{customStyles}</style>

      <section className="service-section team-section fix section-padding bg-cover">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="wow fadeInUp" data-wow-delay=".2s">
              {heading}
            </h2>
          </div>
        </div>

        <div className="container-fluid">
          <Swiper {...swiperOptions}>
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <Link href={`/team-details/${member.id}`} className="card-hover">
                  <div className="team-box-items">
                    <div className="service-thumb">
                      <img src={member.image} alt={member.name} />
                    </div>

                    <div className="service-content">
                      <div>
                        <h3>{member.name}</h3>
                        <p>{member.excerpt}</p>
                      </div>

                      <button className="theme-btn bg-white team-btn text-capitalize">
                        Read More <i className="fa-regular fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="array-button d-flex justify-content-center mt-4">
            <button className="array-prev me-3">
              <i className="fa-regular fa-arrow-left-long" />
            </button>
            <button className="array-next">
              <i className="fa-regular fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
