"use client";
import Link from "next/link";
import React from "react";

const renderDescription = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

export default function BranchDetail({ branches, state }) {
  const stateImage = `/assets/img/JDM India/${state.toLowerCase()}.png`;

  return (
    <section className="branch-details-section fix py-5">
      <div className="container">
        <div className="row row-cols-md-1 row-cols-lg-2 g-4">
            <div className="branch-image">
                <img
                src={stateImage}
                alt={`${state} Branch`}
                width={400}
                height={300}
                style={{ objectFit: "cover", width: "100%" }}
                className="img-fluid rounded"
                loading="lazy"
                />
            </div>
            <div className="col">
              {branches.map((branch, index) => (
                  // <div key={index} className="col wow fadeInUp" data-wow-delay={`.${(index + 1) * 2}s`}>
                  <div className="branch-card pb-3">
                      <div className="branch-content p-3 bg-light shadow-sm rounded-bottom">
                      <h3 className="h4 mb-2 fw-bold color-theme">{branch.region}</h3>
                      <p
                          className="cont mb-3 text-muted small"
                          dangerouslySetInnerHTML={{
                          __html: renderDescription(branch.headquarters || ""),
                          }}
                      />
                      {/* Placeholder for future contact info */}
                      {/* {branch.phone && (
                          <p className="branch-info mb-1">
                          <span className="text-title fw-bold me-2">Phone:</span>
                          <span className="text-data">
                              <Link href={`tel:${branch.phone}`} className="text-primary">
                              {branch.phone}
                              </Link>
                          </span>
                          </p>
                      )}
                      {branch.email && (
                          <p className="branch-info">
                          <span className="text-title fw-bold me-2">Email:</span>
                          <span className="text-data">
                              <Link href={`mailto:${branch.email}`} className="text-primary">
                              {branch.email}
                              </Link>
                          </span>
                          </p>
                      )} */}
                      </div>
                  </div>
                  // </div>
              ))}
            </div>
        </div>
      </div>
      <style jsx>{`
        .branch-image{
          padding: 0px 60px 40px;
          max-height: 400px;
        }
      `}
      </style>
    </section>
  );
}