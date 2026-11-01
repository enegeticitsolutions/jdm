import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';


const TaglineBanner = () => {
  const [imageUrl, setImageUrl] = useState("/assets/img/hero/Banner.jpg"); // Default image source
  const { data, error } = useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/home/`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch home data');
      const data = await res.json();
      // setImageUrl(`${process.env.NEXT_PUBLIC_BASE_URL}${data.hero.image_url}`);
      console.log("imageUrl in tagline banner: ", imageUrl);
      if (data.error) throw new Error(data.error);
      return data;
    },
  });
  console.log("imageUrl in tagline banner: ", imageUrl);
  return (
    <div className="tagline_banner">
      <div className="tagline-content">
        <span className="text-red">Customer </span>
        <span className="text-white">Delight </span>
        <span className="text-small">Is Our </span>
        <span className="text-red">Passion</span>
      </div>

      <style jsx>{`
        .tagline_banner {
          bottom: 6% !important;
        }

        .tagline-content {
          text-align: center;
          font-family: 'Arial', sans-serif;
          font-style: italic;
          font-weight: 700;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); /* Adds depth like in the image */
          white-space: nowrap;
        }

        .text-red {
          color: #a81c24; /* Deep red color */
          font-size: 5rem;
        }

        .text-white {
          color: #ffffff;
          font-size: 5rem;
        }

        .text-small {
          color: #ffffff;
          font-size: 3rem;
          margin: 0 0.5rem;
          vertical-align: baseline;
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .text-red, .text-white { font-size: 4rem; }
          .text-small { font-size: 2.5rem; }
        }
        @media (max-width: 768px) {
          .tagline-content { white-space: normal; }
          .text-red, .text-white { font-size: 3rem; }
          .text-small { font-size: 2rem; }
        }
        @media (max-width: 480px) {
          .text-red, .text-white { font-size: 2rem; }
          .text-small { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}

export default TaglineBanner