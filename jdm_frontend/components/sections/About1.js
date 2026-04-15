"use client";
import React, { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css"; // Import styles if needed

// const defaultData = {
//   title: "Our Story",
//   description:
//     "**JDM Group** was conceptualized by **Late Mr. Pahlad Singh** in 1978, starting with transportation in the logistics field. Renowned for his steadfast commitments, he built a legacy that **JDM** proudly continues under the leadership of **Group Chairman & Managing Director Mr. Sahil Sehrawat** and our dedicated team. **JDM** has evolved into one of the fastest-growing integrated supply chain logistics enterprises with the following verticals:",
//   image1: "assets/img/about/03.jpg",
//   founderImage: "/assets/img/Founder/Lt. Sh. Pahlad Singh Ji.png",
//   image2: "assets/img/about/04.jpg",
//   features: [
//     "JDM Worldwide Freight Solutions Pvt. Ltd. – International Freight Forwarding",
//     "JDM Cargo Planners Pvt. Ltd. – Customs Brokerage, Warehousing, Consultancy",
//     "JDM Express Pvt. Ltd. – Courier Service",
//     "Arrow Transport Service – Transportation",
//     "AS Transport Service – Transportation",
//   ],
// };

const About1 = ({data}) => {
  const aboutData = data;
  console.log("Story Section component data:", aboutData);
  const renderDescription = (text) => {
    if (!text) return "";

    let html = text;

    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    html = html.replace(
      /\bJDM GROUP\b/g,
      "<span class='jdm-highlight'>JDM GROUP</span>"
    );

    html = html.replace(
      /\bJDM\b/g,
      "<span class='jdm-highlight'>JDM</span>"
    );

    return html;
  };



  return (
    <section className="about-section fix section-padding" id="about">
      <div className="about-shape-1 float-bob-x"></div>
      <div className="about-shape-2 float-bob-x"></div>

      <div className="container">
        <div className="about-wrapper">
          <div>
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="about-content">
                  <div className="section-title">
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">
                      {aboutData.heading}
                    </h2>
                  </div>

                  <p
                    className="mt-3 mt-md-0 wow fadeInUp"
                    data-wow-delay=".4s"
                    dangerouslySetInnerHTML={{
                      __html: renderDescription(aboutData.paragraph),
                    }}
                  />

                  <ul className="list-items wow fadeInUp fst-italic" data-wow-delay=".2s">
                    {aboutData.points.map((feature, index) => (
                      <li key={index}>
                        <i className="fa-solid fa-circle-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="about-image">
                  <img
                    src={aboutData.founder_image_url}
                    alt="JDM Group history"
                    className="wow fadeInLeft"
                    data-wow-delay=".2s"
                  />
                </div>
              </div>
            </div>

            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: renderDescription(aboutData.para1),
                }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: renderDescription(aboutData.para2),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ADD STYLE HERE */}
      <style jsx>{`
        :global(.jdm-highlight) {
          color: #b5271f;
          font-weight: 700;
        }
      `}</style>
    </section>
  );

};

export default About1;
