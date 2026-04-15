import Link from "next/link";
import React from "react";

export default function ContactInfo({ data }) {
  return (
    <section className="contact-info-section fix">
      <div className="container">
        <div className="row">
          <div
            className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".2s"
          >
            <div className="contact-box-items">
              <div className="icon">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <div className="content">
                <h3>{data.address_title}</h3>
                <p>{data.address}</p>
              </div>
            </div>
          </div>
          <div
            className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 wow fadeInUp"
            data-wow-delay=".4s"
          >
            <div className="contact-box-items">
              <div className="icon">
                <i className="fa-solid fa-blender-phone"></i>
              </div>
              <div className="content">
                <h3>{data.contact_title}</h3>
                <p>
                  {data.phone_label}:{" "}
                  <Link href={data.phone_href}>
                    {data.phone}
                  </Link>
                  <br />
                  {data.email_label}:{" "}
                  <Link href={data.email_href}>
                    {data.email}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
