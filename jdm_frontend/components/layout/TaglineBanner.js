import React, { useState} from 'react'
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
        {/* <span className="tagline_customerDelight">Customer Delight</span>
        <span className="tagline_isOur">Is Our</span>
        <span className="tagline_passion">Passion</span> */}
        <img src={imageUrl}></img>
    </div>
  )
}

export default TaglineBanner