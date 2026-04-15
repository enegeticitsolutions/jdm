"use client"
import { useState, useEffect, useRef } from 'react';
import TaglineBanner from "../layout/TaglineBanner";
import { useQuery } from "@tanstack/react-query";
// import Loading from "@/app/loading";
// import NotFound from "@/app/loading";

export default function Hero2({video_url = "/assets/img/hero/intro.mp4"}) {
  console.log("video url in hero2: ", video_url);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // useEffect(() => {
  //   if (video_url) {
  //     setVideoSrc(`${process.env.NEXT_PUBLIC_API_URL}${video_url}`);
  //   }
  // }, [video_url]);

  // Handle video visibility and playback
  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Video is visible when section is at least 10% in viewport
        setIsVisible(entry.isIntersecting);
        
        // Play/pause video based on visibility
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Adjust as needed
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
        {console.log("video url inside video tag---------: ", video_url)}
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section fix hero-2">
      <div className="video-container fixed">
        <video 
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          style={{ display: isVisible ? 'block' : 'none' }}
        >
          {console.log("video url inside video tag: ", video_url)}
          <source src={video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {console.log("-----$$$$$$$$$")}
      <TaglineBanner />
    </section>
  );
}