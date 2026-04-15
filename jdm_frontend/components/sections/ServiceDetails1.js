import Link from "next/link";
import React from "react";

const renderDescription = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

export default function ServiceDetails1({ service }) {
  console.log("ServiceDetails1 service prop:", service);
  // Sample categories

  // If service is undefined, render a fallback
  if (
    !service ||
    !service.image ||
    !service.title
    // || !service.description1
  ) {
    return (
      <section className="service-details-section section-padding">
        <div className="container">
          <h2>Service Not Available</h2>
          <p>Please select a valid service.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="service-details-section section-padding">
        <div className="text-center mb-2 mt-3">
          <h2 className="service-title">{service.title}</h2>
        </div>

        <div className="container">
          <div className="service-details-wrapper">
            <div className="row g-4">
              <div className="row g-4">
                <div className="service-details-image col-lg-6">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-details-content col-lg-6">
                  {/* <h2>{service.title}</h2> */}
                  {/* <p>{service.description1}</p> */}
                  <p
                    className="cont"
                    dangerouslySetInnerHTML={{
                      __html: renderDescription(service.description1),
                    }}
                  />
                  {service.benefits && service.benefits.length > 0 && (
                    <ul className="details-list">
                      {service.benefits.map((benefit, index) => (
                        <li key={index}>
                          <i className="fa-solid fa-circle-check" />
                          {typeof benefit === "string" ? benefit : benefit.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {service.heading ===
              "Warehousing of Goods in Public and Private Bonded Warehouses" && (
              <h5 className="pt-3 mt-4">{service.heading}</h5>
            )}
            {/* <p className="cont" dangerouslySetInnerHTML={{
                __html: renderDescription(service.description2),
              }}/> */}
            {service.description2 && (
              <p
                className="cont"
                dangerouslySetInnerHTML={{
                  __html: renderDescription(service.description2),
                }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
