"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { highlightContent } from "@/util/highlightContent";
import { useValueAddedServices } from "@/hooks/useValueAddedServices";
import Loading from "@/app/loading";

const OtherServices = () => {
  const { data: tabs, isLoading, error } = useValueAddedServices();
  const [activeTab, setActiveTab] = useState(""); // Default tab

  // Set the default active tab once tabs are loaded
  useEffect(() => {
    if (tabs && tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  if (isLoading) return <Loading />;

  if (error || !tabs || tabs.length === 0) {
    return (
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Value Added Services">
        <Head>
          <title>Other Services | JDM Logistics</title>
        </Head>
        <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
          <h2>Failed to Load Services</h2>
          <p>Value Added Services are currently unavailable.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Value Added Services">
      <Head>
        <title>Other Services | JDM Logistics</title>
        <meta
          name="description"
          content="Explore JDM Logistics' additional services including consultancy, SVB, drawback, cargo insurance, and online filing."
        />
      </Head>

      {/* Hero Section */}
      <section className="hero" id="Value Added Services">
        {/* Tab Section with Horizontal Menu at Top of Content */}
        <div className="services-section">
          <div className="container">
            <div className="tab-container">
              <div className="content-box">
                <ul className="sector-nav wow fadeInUp" data-wow-delay=".2s">
                  {/* (tabs &&  */}
                    {tabs.map((tab) => (
                      <li
                        key={tab.id}
                        className={activeTab === tab.id ? "active" : ""}
                      >
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className="tab-button"
                        >
                          {tab.title}
                        </button>
                      </li>
                    ))}
                  {/* ) */}
                </ul>
                <div className="tab-content wow fadeInUp" data-wow-delay=".4s">
                  {(() => {
                    const currentTab = tabs.find((tab) => tab.id === activeTab);
                    if (!currentTab) return null;

                    const processedContent = highlightContent(
                      currentTab.content,
                      currentTab.title
                    );

                    return <MarkdownRenderer content={processedContent} />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Styles Inspired by Clientele */}
      <style jsx>{`
        .hero {
          padding: 60px 0;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }
        .tab-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .content-box {
          background: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden; /* Ensure rounded corners apply to children */
        }
        .sector-nav {
          display: flex;
          flex-direction: row; /* Horizontal layout */
          flex-wrap: wrap;
          list-style: none;
          padding: 0;
          margin: 0;
          background: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .sector-nav li {
          display: block;
          border-left: 1px solid var(--bs-gray-200);
          border-right: 1px solid var(--bs-gray-200);
        }
        .sector-nav li button {
          padding: 12px 20px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
          background: none;
          border: none;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
        }
        .sector-nav li:last-child button {
          border-bottom: none;
        }
        .sector-nav li:hover button,
        .sector-nav li.active button {
          background: var(--theme2, #f59e0b);
          color: var(--theme);
        }
        .tab-content {
          padding: 30px;
          min-height:220px;
        }
        .tab-content p {
          margin: 0 0 15px;
          font-size: 16px;
          color: #666;
          line-height: 1.6;
        }
        @media (max-width: 767px) {
          .sector-nav {
            flex-direction: row; /* Keep horizontal on mobile */
            justify-content: center; /* Center tabs on mobile */
          }
          .sector-nav li button {
            font-size: 14px;
            padding: 10px 15px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default OtherServices;