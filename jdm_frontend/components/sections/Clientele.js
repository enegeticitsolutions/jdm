"use client";
import React, { useState, useEffect } from "react";

const Clientele = () => {
  const [activeTab, setActiveTab] = useState("sector");
  const [activeSector, setActiveSector] = useState("Agriculture");
  const [activeCountry, setActiveCountry] = useState("India");
  const [activeSubcountry, setActiveSubcountry] = useState(null);
  const [sectorLogos, setSectorLogos] = useState([]);
  const [countryLogos, setCountryLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStaticData = () => {
      const sectors = [
        { name: "Agriculture", logos: Array.from({ length: 3 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Agriculture/${i + 1}.png`, alt: `Agriculture Logo ${i + 1}` })) },
        { name: "Auto Industries", logos: Array.from({ length: 51 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Auto Industries/${i + 1}.png`, alt: `Auto Industries Logo ${i + 1}` })) },
        { name: "Aviation", logos: Array.from({ length: 2 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Aviation/${i + 1}.png`, alt: `Aviation Logo ${i + 1}` })) },
        { name: "Chemicals", logos: Array.from({ length: 9 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Chemicals/${i + 1}.png`, alt: `Chemicals Logo ${i + 1}` })) },
        { name: "Construction", logos: Array.from({ length: 4 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Construction/${i + 1}.png`, alt: `Construction Logo ${i + 1}` })) },
        { name: "Electronics", logos: Array.from({ length: 33 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Electronics/${i + 1}.png`, alt: `Electronics Logo ${i + 1}` })) },
        { name: "Energy", logos: Array.from({ length: 11 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Energy/${i + 1}.png`, alt: `Energy Logo ${i + 1}` })) },
        { name: "Foods", logos: Array.from({ length: 7 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Foods/${i + 1}.png`, alt: `Foods Logo ${i + 1}` })) },
        { name: "Home Appliance", logos: Array.from({ length: 10 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Home Appliances/${i + 1}.png`, alt: `Home Appliance Logo ${i + 1}` })) },
        { name: "Luxury", logos: Array.from({ length: 7 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/luxury/${i + 1}.png`, alt: `Luxury Logo ${i + 1}` })) },
        { name: "Mobile Spare Parts", logos: Array.from({ length: 6 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Mobile and Spare Parts/${i + 1}.png`, alt: `Mobile Spare Parts Logo ${i + 1}` })) },
        { name: "Paper and Packaging", logos: Array.from({ length: 11 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Paper and Packaging/${i + 1}.png`, alt: `Paper and Packaging Logo ${i + 1}` })) },
        { name: "Pharmaceutical", logos: Array.from({ length: 17 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Medical/${i + 1}.png`, alt: `Pharmaceutical Logo ${i + 1}` })) },
        { name: "RMG and Fashion", logos: Array.from({ length: 8 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/RMG and Fassion/${i + 1}.png`, alt: `RMG and Fashion Logo ${i + 1}` })) },
        { name: "Safety and Security", logos: Array.from({ length: 6 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Safety and Security/${i + 1}.png`, alt: `Safety and Security Logo ${i + 1}` })) },
        { name: "Steel and Iron", logos: Array.from({ length: 2 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Sector_Wise/Steel and Iron/${i + 1}.png`, alt: `Steel and Iron Logo ${i + 1}` })) },
      ];

      const countries = [
        {
          name: "India",
          logos: Array.from({ length: 147 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/India/${i + 1}.png`, alt: `India Logo ${i + 1}` })),
        },
        {
          name: "Asia",
          subcountries: [
            {
              name: "China",
              logos: Array.from({ length: 5 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Asia/China/${i + 1}.png`, alt: `China Logo ${i + 1}` })),
            },
            {
              name: "Japan",
              logos: Array.from({ length: 11 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Asia/Japan/${i + 1}.png`, alt: `Japan Logo ${i + 1}` })),
            },
            {
              name: "Singapore",
              logos: Array.from({ length: 2 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Asia/Singapore/${i + 1}.png`, alt: `South Korea Logo ${i + 1}` })),
            },
            {
              name: "South Korea",
              logos: Array.from({ length: 3 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Asia/South Korea/${i + 1}.png`, alt: `South Korea Logo ${i + 1}` })),
            },
            {
              name: "Taiwan",
              logos: Array.from({ length: 1 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Asia/Taiwan/${i + 1}.png`, alt: `South Korea Logo ${i + 1}` })),
            },
          ],
        },
        {
          name: "Europe",
          subcountries: [
            {
              name: "Germany",
              logos: Array.from({ length: 8 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/Germany/${i + 1}.png`, alt: `Germany Logo ${i + 1}` })),
            },
            {
              name: "Italy",
              logos: Array.from({ length: 4 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/Italy/${i + 1}.png`, alt: `Italy Logo ${i + 1}` })),
            },
            {
              name: "United Kingdom",
              logos: Array.from({ length: 4 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/UK/${i + 1}.png`, alt: `UK Logo ${i + 1}` })),
            },
            {
              name: "Finland",
              logos: Array.from({ length: 2 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/Finland/${i + 1}.png`, alt: `UK Logo ${i + 1}` })),
            },
            {
              name: "France",
              logos: Array.from({ length: 2 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/France/${i + 1}.png`, alt: `UK Logo ${i + 1}` })),
            },
            {
              name: "Ireland",
              logos: Array.from({ length: 1 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/Ireland/${i + 1}.png`, alt: `UK Logo ${i + 1}` })),
            },
            {
              name: "Poland",
              logos: Array.from({ length: 1 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/Poland/${i + 1}.png`, alt: `UK Logo ${i + 1}` })),
            },
            {
              name: "Sweden",
              logos: Array.from({ length: 2 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/Sweden/${i + 1}.png`, alt: `UK Logo ${i + 1}` })),
            },
            {
              name: "Switzerland",
              logos: Array.from({ length: 2 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/Europe/Switzerland/${i + 1}.png`, alt: `UK Logo ${i + 1}` })),
            },
          ],
        },
        {
          name: "North America",
          subcountries: [
            {
              name: "United States",
              logos: Array.from({ length: 15 }, (_, i) => ({ id: i, src: `/assets/img/customer_logo/Country_Wise/North America/United States/${i + 1}.png`, alt: `United States Logo ${i + 1}` })),
            },
          ],
        },
      ];

      setSectorLogos(sectors);
      setCountryLogos(countries);
    };

    fetchStaticData();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}/clientele/api/`);
          const data = await response.json();
          if (data && data.sectors && Array.isArray(data.sectors) && data.sectors.length > 0) {
            setSectorLogos(data.sectors);
          }
          if (data && data.countries && Array.isArray(data.countries) && data.countries.length > 0) {
            setCountryLogos(data.countries);
          }
        } catch (error) {
          console.error("Error fetching clientele data:", error);
        }
      };
      fetchData();
    }
  }, []);

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setActiveSubcountry(null);
      setIsLoading(false);
    }, 500);
  };

  const handleSectorChange = (sectorName) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveSector(sectorName);
      setIsLoading(false);
    }, 500);
  };

  const handleCountryChange = (countryName) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveCountry(countryName);
      const country = countryLogos.find((c) => c.name === countryName);
      const firstSubcountry = country?.subcountries?.[0]?.name || null;
      setActiveSubcountry(firstSubcountry);
      setIsLoading(false);
    }, 500);
  };

  const handleSubcountryChange = (subcountryName) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveSubcountry(subcountryName);
      setIsLoading(false);
    }, 500);
  };

  const selectedSectorLogos = sectorLogos.find((sector) => sector.name === activeSector)?.logos || [];
  const selectedCountry = countryLogos.find((country) => country.name === activeCountry);
  const selectedLogos = activeSubcountry
    ? selectedCountry?.subcountries?.find((sub) => sub.name === activeSubcountry)?.logos || []
    : selectedCountry?.logos || [];

  return (
    <section className="container py-5" id="clientele">
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "sector" ? "active" : ""}`}
            onClick={() => handleTabChange("sector")}
          >
            Sectors
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "country" ? "active" : ""}`}
            onClick={() => handleTabChange("country")}
          >
            Continents
          </button>
        </li>
      </ul>

      <div className="clientele-box bg-white shadow">
        {activeTab === "sector" ? (
          sectorLogos.length > 0 ? (
            <div className="sector-container">
              <ul className="sector-nav">
                {sectorLogos.map((sector) => (
                  <li
                    key={sector.name}
                    className={activeSector === sector.name ? "active" : ""}
                  >
                    <button onClick={() => handleSectorChange(sector.name)}>
                      {sector.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="sector-content">
                {isLoading ? (
                  <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <>
                    <h3 className="wow fadeInUp color-theme" data-wow-delay=".2s">
                      {activeSector}
                    </h3>
                    {selectedSectorLogos.length > 0 ? (
                      <div className="logo-grid">
                        {selectedSectorLogos.map((logo) => (
                          <div key={logo.id} className="grid-item">
                            <div className="brand-image center">
                              <img
                                src={logo.src}
                                alt={logo.alt}
                                className="img-fluid"
                                style={{ maxWidth: "150px" }}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = "/fallback-image.png";
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No logos available for this sector.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <p>Loading sectors or no data available...</p>
          )
        ) : (
          countryLogos.length > 0 ? (
            <div className="sector-container country-container">
              <ul className="sector-nav country-nav">
                {countryLogos.map((country) => (
                  <li
                    key={country.name}
                    className={activeCountry === country.name ? "active" : ""}
                  >
                    <button
                      onClick={() => handleCountryChange(country.name)}
                      className={activeCountry === country.name ? "active" : ""}
                    >
                      {country.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="sector-content flex">
                {selectedCountry?.subcountries && (
                  <ul className="subcountry-nav flex-column">
                    {selectedCountry.subcountries.map((subcountry) => (
                      <li
                        key={subcountry.name}
                        className={activeSubcountry === subcountry.name ? "active" : ""}
                      >
                        <button
                          onClick={() => handleSubcountryChange(subcountry.name)}
                          className={activeSubcountry === subcountry.name ? "active" : ""}
                        >
                          {subcountry.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {isLoading ? (
                  <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <div className="w-100">  
                    <h3 className="wow fadeInUp color-theme" data-wow-delay=".2s">
                      {activeSubcountry || activeCountry}
                    </h3>
                    {selectedLogos.length > 0 ? (
                      <div className="logo-grid">
                        {selectedLogos.map((logo) => (
                          <div key={logo.id} className="grid-item">
                            <div className="brand-image center">
                              <img
                                src={logo.src}
                                alt={logo.alt}
                                className="img-fluid"
                                style={{ maxWidth: "150px" }}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = "/fallback-image.png";
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No logos available for this {activeSubcountry ? "country" : "continent"}.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Loading countries or no data available...</p>
          )
        )}
      </div>

      <style jsx>{`
        .nav-tabs {
          border-bottom: none;
        }
        .nav-link {
          width: 200px;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: 600;
          color: #333;
          background: #f8f9fa;
          border: none;
          border-radius: 25px;
          margin: 0 10px;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .nav-link:hover {
          background: #FCCA40;
          color: #000;
        }
        .nav-link.active {
          background: var(--theme, #f59e0b);
          color: white;
        }
        .clientele-box {
          /* Removed min-height as it's not needed anymore */
        }
        .sector-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .sector-nav,
        .subcountry-nav {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          padding: 0;
          margin: 0;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
          .subcountry-nav{
            min-width: 250px;
          }
        .sector-nav li,
        .subcountry-nav li {
          border-left: 1px solid var(--bs-gray-200);
          border-right: 1px solid var(--bs-gray-200);
        }
        .sector-nav li button,
        .subcountry-nav li button {
          width: 100%;
          padding: 12px 20px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          background: none;
          border: none;
          border-bottom: 1px solid #eee;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
        }
        .sector-nav li:hover button,
        .sector-nav li.active button,
        .subcountry-nav li:hover button,
        .subcountry-nav li.active button {
          background: var(--theme2);
          color: var(--theme);
        }
        .sector-content {
          flex: 1;
          position: relative;
          min-height: 400px;
          text-align: center;
        }
        .sector-content h3 {
          margin-top: 20px;
          margin-bottom: 20px;
          text-align: center;
        }
        .logo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          justify-items: center;
          max-height: 750px;
          overflow-y: auto;
          padding: 20px;
        }
        .grid-item {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .brand-image.center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loading-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid var(--theme, #f59e0b);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 767px) {
          .sector-container {
            flex-direction: column;
          }
          .sector-nav {
            width: 100%;
          }
          .logo-grid {
            max-height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Clientele;