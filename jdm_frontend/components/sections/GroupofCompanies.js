'use client'
import React from 'react';

import { useGroupCompanies } from "@/hooks/useGroupCompanies";

const GroupofCompanies = () => {
  const { data: companies = [] } = useGroupCompanies();

  return (
  <>
    <section className="relative group-of-companies flex items-center justify-center section-padding">
      {/* Background Image */}
      <img
        src="assets/img/group_of_companies/building.png"
        alt="Building Background"
        className="absolute inset-0 object-cover h-100"
      />
      {/* Content Overlay */}
      <div className="relative z-10 text-black">
        {/* Subheading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-2 border-red-600 inline-block">
          JDM GROUP OF COMPANIES
        </h2>

        {/* List of Companies */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg list-items">
          {companies.map((company, index) => (
            <li key={index} className="text-black">
              {company.link ? (
                <a href={company.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-black">
                  <i className="fa-solid fa-circle-check" /> {company.name}
                </a>
              ) : (
                <>
                  <i className="fa-solid fa-circle-check" /> {company.name}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
    <style jsx>
        {`
          .group-of-companies{
            height:675px;
            gap:80px;
          }
        `}
    </style>
  </>
  );
};

export default GroupofCompanies;