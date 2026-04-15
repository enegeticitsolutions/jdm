"use client"
import React, { useState, useEffect } from 'react';

// Default network data as fallback
const defaultNetworkData = [
  {
    region: "North America",
    headquarters: "New York, USA",
    branches: "15 locations across the US and Canada",
  },
  {
    region: "Europe",
    headquarters: "London, UK",
    branches: "12 locations across Western Europe",
  },
  {
    region: "Asia-Pacific",
    headquarters: "Singapore",
    branches: "20 locations across Asia and Australia",
  },
];

const Network = () => {
  const [networkData, setNetworkData] = useState(defaultNetworkData); // Initialize with default data

  // Fetch network data from API on mount
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const fetchNetworkData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/api/network/`); // Hypothetical endpoint
        const data = await response.json();
        // Assuming the API returns an array of objects with region, headquarters, and branches
        if (data && Array.isArray(data) && data.length > 0) {
          const fetchedNetworkData = data.map(item => ({
            region: item.region || "Unknown Region",
            headquarters: item.headquarters || "Unknown Headquarters",
            branches: item.branches || "No branch information",
          }));
          setNetworkData(fetchedNetworkData);
        }
      } catch (error) {
        console.error("Error fetching network data:", error);
        // Fallback to defaultNetworkData (already set)
      }
    };

    fetchNetworkData();
  }, []); // Runs once on mount

  return (
    <section className="network-section fix" id="network">
      <div>
        <div className="flex flex-column items-center justify-content-center align-items-center max-h-[700px] h-[700px] rounded-lg overflow-hidden">
        <div className="section-title text-center">
          {/* <h6 className="wow fadeInUp">
            <i className="fa-regular fa-arrow-left-long" />
            Milestones & Achievements
            <i className="fa-regular fa-arrow-right-long" />
          </h6> */}
          <h2 className="wow fadeInUp" data-wow-delay=".2s">
          Our Global Network
          </h2>
          <div className='flex flex-column items-center justify-content-center align-items-center py-2'>
            <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
              JDM operates a vast network of branches worldwide, delivering exceptional services tailored to local needs while maintaining global standards.
            </p>
          </div>
        </div>
        {/* <div className="w-full network-section-header px-10 md:px-20 flex flex-column align-items-center h-full text-black gap-1">
            <h2 className="text-4xl font-bold mb-4 wow fadeInUp" data-wow-delay=".3s">
              Our Global Network
            </h2> */}

            {/* Branch List */}
            {/* <div className="space-y-6 wow fadeInUp" data-wow-delay=".7s">
              {networkData.map((branch, index) => (
                <div key={index} className="branch-item">
                  <h3 className="text-xl font-semibold">{branch.region}</h3>
                  <p className="text-white/70">
                    Headquarters: {branch.headquarters}<br />
                    Branches: {branch.branches}
                  </p>
                </div>
              ))}
            </div> */}
          {/* </div> */}
          <div className="world-image-wrapper w-full h-full wow fadeInUp" data-wow-delay=".9s">
            <img
              src="assets/img/our_network/JDM Network.png"
              alt="World Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .network-section {
          position: relative;
          .network-section-header p{
              max-width: 38%;
              text-align: center;
          }
        }
        .world-image-wrapper{
          padding: 0px 140px 50px;
        }
        .branch-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 1rem;
        }

        .branch-item:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .network-section .container {
            padding: 0;
          }

          .bg-amber-500 {
            height: auto;
            max-height: none;
          }
          .world-image-wrapper{
            padding: 0px 10px 20px;
          }
          .p-8 {
            padding: 2rem;
          }

          .text-4xl {
            font-size: 2rem;
          }

          .text-xl {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Network;