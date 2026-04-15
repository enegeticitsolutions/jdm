"use client"
import React from "react";
import CounterNumber from "../elements/CounterNumber";

export default function Counter1({ counterData }) {

  const renderDescription = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="row">
      {counterData.map((item, index) => (
        <div
          key={index}
          className="col-lg-4 col-md-3 wow fadeInUp"
          data-wow-delay={item.delay}
        >
          <div className="counter-items">
            <div className="content">
              <div className="icon">
                <img src={item.icon} alt="img" />
              </div>
              <h2>
              {item.prefix}
                <span className="count">
                  <CounterNumber count={item.count} />
                </span>
                <br />
                {item.suffix}
              </h2>
              <p
                className="mt-3 mt-md-0 wow fadeInUp"
                data-wow-delay=".4s"
                dangerouslySetInnerHTML={{
                  __html: renderDescription(item.title),
                }}
              />
              {/* <p>{item.label}</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}