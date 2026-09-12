'use client'
import React, { useRef, useEffect, useState } from 'react';

const Journey = ({ url, heading }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  console.log("Journey url: ", url);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.01, // Video plays when 50% of it is visible
      }
    );

    if (videoRef.current) {
      console.log("Video is being observe");

      observer.observe(videoRef.current);
    }

    // Cleanup
    return () => {
      if (videoRef.current) {
        console.log("Video is being unobserve");
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Decrease speed
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);
  console.log("oooo: ", videoRef)
  return (
    <section className="journey-section fix py-4" id="journey">
      <div className="container">
        <div className="section-title text-center mb-3">
          <h2 className="fadeInUp" data-wow-delay=".2s">
            {heading}
          </h2>
        </div>
      </div>
      <div className="journey-video-wrapper w-100 overflow-hidden">
        <video
          key={url}
          ref={videoRef}
          className="journey-video"
          loop
          muted
          playsInline
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <style jsx>{`
        .journey-video-wrapper {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .journey-video {
          width: 100%;
          max-width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }
        @media (max-width: 575px) {
          .journey-section {
            padding: 20px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Journey;