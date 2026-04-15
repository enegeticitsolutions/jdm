"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";

export default function About2() {
  const [isOpen, setOpen] = useState(false);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("https://jdm-backend.onrender.com/home/api/about/", {
          cache: "no-store", // Fresh data every time
        });
        const data = await response.json();
		console.log("home about data", data);
        setAboutData(data.about[0]); // Take the first item from the "about" array
      } catch (err) {
        console.error("Failed to fetch about data:", err);
        // Keep default data by not setting aboutData
      }
    };
    fetchAboutData();
  }, []);

  // Default data if backend fetch fails or hasn’t completed
  const defaultHeading = "JDM Group Of Companies";
  const defaultParagraph =
    "Our mission is to provide operational excellence, competitive cost control and visibility to our customers who are globally sourcing and distributing in an integrated supply chain environment.";
    const defaultPoints = [
      "JDM Worldwide Freight Solutions Pvt. Ltd. - International Freight Forwarding",
      "JDM Cargo Planners Pvt. Ltd. - Customs Brokerage, Warehousing, Consultancy",
      "JDM Express Pvt. Ltd. - Courier Service",
      "Arrow Transport Service - Transportation",
      "AS Transport Service - Transportation",
  ];  
  const defaultVideoId = "JXMWOmuR1hU";

  return (
    <>
      <section className="about-section fix section-padding" id="about">
        <div className="about-shape-4 float-bob-x">
          <img src="assets/img/about/about-shape-4.png" alt="img" />
        </div>
        <div className="about-shape-5 float-bob-y">
          <img src="assets/img/about/about-shape-5.png" alt="img" />
        </div>
        <div className="container">
          <div className="about-wrapper-2">
            <div className="row g-4">
              <div className="col-lg-5">
                <div className="about-image">
                  <img
                    src="assets/img/about/03.jpg"
                    alt="img"
                    className="wow fadeInLeft"
                    data-wow-delay=".3s"
                  />
                  <div className="about-image-2 wow fadeInUp" data-wow-delay=".2s">
                    <img src="assets/img/about/04.jpg" alt="img" />
                  </div>
                  {/* <div className="video-items wow fadeInUp">
                    <a onClick={() => setOpen(true)} className="video-btn video-popup">
                      <i className="fas fa-play" />
                    </a>
                    <a onClick={() => setOpen(true)} className="video-text video-popup">
                      play now
                    </a>
                  </div> */}
                  <div className="bar-shape">
                    <img src="assets/img/about/bar 2.png" alt="img" />
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-content">
                  <div className="section-title">
                    <h2
                      className="wow fadeInUp fst-italic"
                      data-wow-delay=".2s"
                      dangerouslySetInnerHTML={{
                        __html: aboutData?.Heading || defaultHeading,
                      }}
                    />
                  </div>
                  <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".4s">
                    {aboutData?.Paragraph || defaultParagraph}
                  </p>
                  <ul className="list-items wow fadeInUp fst-italic" data-wow-delay=".2s">
                    {(aboutData?.array_of_Points || defaultPoints).map((point, index) => (
                      <li key={index}>
                        <i className="fa-solid fa-circle-check" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {aboutData?.CEO_Photo && aboutData?.CEO_Name && (
                    <div className="about-author">
                      <div className="author-image wow fadeInUp" data-wow-delay=".2s">
					  <img
						src={`https://jdm-backend.onrender.com${aboutData.CEO_Photo}`}
						alt="ceo-img"
						className="img-fluid rounded"
						style={{ height: '100px', width: '100px', objectFit: 'cover' }}
						/>
                        <h6>{aboutData.CEO_Name}</h6>
                      </div>
                    </div>
                  )}
                  <div className="about-author">
                    <Link
                      href="about"
                      className="theme-btn wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      Explore more <i className="fa-regular fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={
          aboutData?.Intro_Video_Link && aboutData.Intro_Video_Link.includes("youtube.com")
            ? new URL(aboutData.Intro_Video_Link).searchParams.get("v")
            : defaultVideoId
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
}