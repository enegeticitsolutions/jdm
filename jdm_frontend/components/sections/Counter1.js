"use client"
import React from "react";
import CounterNumber from "../elements/CounterNumber";

export default function Counter1({ counterData }) {

  const renderDescription = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="row g-4">
      {counterData.map((item, index) => (
        <div
          key={index}
          className="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-delay={item.delay}
        >
          <div className="counter-items style-old">
            <div className="content">
              <div className="icon">
                {item.icon && <img src={item.icon} alt="icon" />}
              </div>
              <h2>
                {item.prefix}
                <span className="count">
                  <CounterNumber count={item.count} />
                </span>
                {item.suffix}
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: renderDescription(item.title),
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}