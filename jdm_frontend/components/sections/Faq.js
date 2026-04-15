"use client";
import { useState, useEffect } from "react";

// Default FAQ data as fallback
const defaultFaqItems = [
  {
    id: 1,
    question: "Why should you prefer JDM Group?",
    answer:
      "We are far better than other CHAs because we have all three kinds of services collectively that others don't have (Own Brokerage License, Own Transportation, Own Warehouse). Our warehouse & office in Delhi are close to the airport, enabling superior service especially during COVID-19. We saved customers crores in demurrages by clearing cargo during lockdown and storing it in our warehouse until their facilities reopened.",
    delay: ".1s",
  },
  {
    id: 2,
    question: "What types of freight services do you offer?",
    answer:
      "We offer comprehensive freight solutions including Air Freight, Ocean Freight, Rail Transport, Road Transport, and Multimodal services tailored to your business needs.",
    delay: ".2s",
  },
  {
    id: 3,
    question: "Do you provide international freight forwarding?",
    answer:
      "Yes, we specialize in international freight forwarding with end-to-end services including pickup, documentation, customs clearance, and final delivery.",
    delay: ".3s",
  },
  {
    id: 4,
    question: "What industries do you serve?",
    answer:
      "We cater to a wide range of industries including Automotive, Electronics, Agriculture, Pharmaceuticals, Textile, Steel & Iron, Perishables, and more.",
    delay: ".4s",
  },
  {
    id: 5,
    question: "How do I get a freight quote?",
    answer:
      "You can request a free quote through our website or contact our customer service team with your shipment details.",
    delay: ".5s",
  },
  {
    id: 6,
    question: "What customs brokerage services do you offer?",
    answer:
      "We handle import/export clearance, HS code classification, duty & tax calculations, license handling, and regulatory compliance.",
    delay: ".6s",
  },
  {
    id: 7,
    question: "How long does the customs clearance process take?",
    answer:
      "Customs clearance timelines depend on shipment type and origin/destination. Typically, clearance is completed within 1–3 business days.",
    delay: ".7s",
  },
  {
    id: 8,
    question: "Can you help with restricted or regulated goods?",
    answer:
      "Yes, we assist with documentation, licenses, and clearances for restricted or regulated commodities.",
    delay: ".8s",
  },
  {
    id: 9,
    question: "What documents are required for customs clearance?",
    answer:
      "Essential documents include the commercial invoice, packing list, bill of lading/airway bill, and any relevant certificates or licenses.",
    delay: ".9s",
  },
  {
    id: 10,
    question: "Do you offer support for post-clearance audits or disputes?",
    answer:
      "Yes, our team can represent you in audits and assist with customs dispute resolution.",
    delay: "1.0s",
  },
  {
    id: 11,
    question: "What areas do you cover for road transportation?",
    answer:
      "We offer pan-India and cross-border road transportation with express and standard delivery options.",
    delay: "1.1s",
  },
  {
    id: 12,
    question: "Do you offer temperature-controlled or special handling transport?",
    answer:
      "Yes, we provide refrigerated transport, high-value cargo handling, and specialized equipment for delicate or oversized shipments.",
    delay: "1.2s",
  },
  {
    id: 13,
    question: "Is your fleet GPS-enabled?",
    answer:
      "Yes, all our transport vehicles are equipped with GPS for real-time tracking and route optimization.",
    delay: "1.3s",
  },
  {
    id: 14,
    question: "Do you handle perishable or time-sensitive shipments?",
    answer:
      "Yes, we specialize in the timely delivery of perishables including fruits, vegetables, flowers, and pharmaceuticals.",
    delay: "1.4s",
  },
];


export default function Faq() {
  const [isAccordion, setIsAccordion] = useState(1);
  const [faqItems, setFaqItems] = useState(defaultFaqItems); // Initialize with default FAQ items

  // Fetch FAQ data from API on mount
  // useEffect(() => {
  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  //   // const fetchFaqData = async () => {
  //   //   try {
  //   //     const response = await fetch(`${apiUrl}/home/api/faq/`); // Hypothetical endpoint
  //   //     const data = await response.json();
  //   //     // Assuming the API returns an array of objects with id, question, and answer
  //   //     if (data && Array.isArray(data) && data.length > 0) {
  //   //       const fetchedFaqItems = data.map((item, index) => ({
  //   //         id: item.id || index + 1, // Use API ID or fallback to index
  //   //         question: item.question || "Unnamed Question",
  //   //         answer: item.answer || item.content || "No answer provided.",
  //   //         delay: defaultFaqItems[index % defaultFaqItems.length].delay, // Reuse delays
  //   //       }));
  //   //       setFaqItems(fetchedFaqItems);
  //   //     }
  //   //   } catch (error) {
  //   //     console.error("Error fetching FAQ data:", error);
  //   //     // Fallback to defaultFaqItems (already set)
  //   //   }
  //   // };

  //   fetchFaqData();
  // }, []);
   // Runs once on mount

  const handleAccordion = (key) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  return (
    <>
      <section
        className="faq-section fix section-padding section-bg-2 bg-cover"
      >
        <div className="track-shape float-bob-x">
          {/* <img src="assets/img/track.png" alt="img" /> */}
        </div>
        <div className="container">
          <div className="faq-wrapper">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="faq-content">
                  <div className="section-title">
                    {/* <h6 className="wow fadeInUp">
                      <i className="fa-regular fa-arrow-left-long" />
                      faq
                      <i className="fa-regular fa-arrow-right-long" />
                    </h6> */}
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">
                      your frequently ask & questions
                    </h2>
                  </div>
                  <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".4s">
                    It is a long established fact that a reader will be
                    distracted the readable content of a page when looking at
                    layout the point of using lorem the is Ipsum less normal
                    distribution of letters.
                  </p>
                  <div className="icon-items wow fadeInUp" data-wow-delay=".2s">
                    <div className="icon">
                      <i className="fa-regular fa-check" />
                    </div>
                    <div className="content">
                      <h5>UNIQUE PROJECTS</h5>
                      <span>
                        It is a long established fact that a reader will be
                        distracted the readable content of a page when
                      </span>
                    </div>
                  </div>
                  <div className="icon-items wow fadeInUp" data-wow-delay=".4s">
                    <div className="icon">
                      <i className="fa-regular fa-check" />
                    </div>
                    <div className="content">
                      <h5>UNIQUE PROJECTS</h5>
                      <span>
                        It is a long established fact that a reader will be
                        distracted the readable content of a page when
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="faq-accordion">
                  <div className="accordion" id="accordion">
                    {faqItems.map((item) => (
                      <div
                        key={item.id}
                        className="accordion-item mb-3 wow fadeInUp"
                        data-wow-delay={item.delay}
                      >
                        <h5 className="accordion-header">
                          <button
                            onClick={() => handleAccordion(item.id)}
                            className={
                              isAccordion === item.id
                                ? "accordion-button"
                                : "accordion-button collapsed"
                            }
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faq${item.id}`}
                            aria-expanded={isAccordion === item.id}
                            aria-controls={`faq${item.id}`}
                          >
                            {item.question}
                          </button>
                        </h5>
                        <div
                          id={`faq${item.id}`}
                          className={
                            isAccordion === item.id
                              ? "accordion-collapse collapse show"
                              : "accordion-collapse collapse"
                          }
                          data-bs-parent="#accordion"
                        >
                          <div className="accordion-body">{item.answer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}