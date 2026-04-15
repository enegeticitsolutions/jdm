"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import GallerySection from "../../components/sections/GallerySection";
import { useGalleryEvents } from "@/hooks/useGalleryEvents"; // adjust path accordingly

const Gallery = () => {
  const { data: eventImages = [], isLoading: queryLoading, isError } = useGalleryEvents();
  const [activeEvent, setActiveEvent] = useState("");
  console.log("Gallery Events Data:", eventImages);

  useEffect(() => {
    if (eventImages.length > 0 && !activeEvent) {
      console.log("------------>", eventImages);
      setActiveEvent(eventImages[0].title);
    }
  }, [eventImages]);

  const handleEventChange = (eventTitle) => {
    setActiveEvent(eventTitle);
  };

  const selectedEvent = eventImages.find((event) => event.title === activeEvent);

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Gallery">
      <Head>
        <title>Gallery | JDM Logistics</title>
        <meta
          name="description"
          content="Explore our gallery showcasing JDM Logistics' events and celebrations."
        />
      </Head>

      <section className="container py-5" id="gallery">
        <div className="gallery-box bg-white shadow">
          {isError ? (
            <p>Error loading gallery data.</p>
          ) : (
            <GallerySection
              items={eventImages}
              selectedTitle={activeEvent}
              onTitleChange={handleEventChange}
              isLoading={queryLoading}
              fallbackImage="/fallback-image.png"
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
