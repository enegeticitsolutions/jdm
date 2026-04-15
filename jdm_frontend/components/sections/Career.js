"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const defaultData = {
  image1: "assets/img/about/03.jpg",
  image2: "assets/img/about/04.jpg",
};

const CareerSection = ({ jobs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isGeneralForm, setIsGeneralForm] = useState(false);
  const [aboutData] = useState(defaultData);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/csrf/`, {
      method: "get",
      credentials: "include",
    });
  }, []);


  useEffect(() => {
    const jobParam = searchParams.get("job");
    if (jobParam) {
      const job = jobs.find((j) => j.applyLink?.includes(jobParam));
      console.log("Found job for modal:", job);
      if (job) {
        setSelectedJob(job);
        setIsModalOpen(true);
        setIsGeneralForm(false);
      }
    }
  }, [searchParams, jobs]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setIsGeneralForm(false);
    router.push("/careers");
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsGeneralForm(false);
    setIsModalOpen(true);
  };

  const handleGeneralApplyClick = () => {
    setSelectedJob(null);
    setIsGeneralForm(true);
    setIsModalOpen(true);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const getDepartmentFromJob = useCallback((jobTitle) => {
    if (!jobTitle) return "General";
    const title = jobTitle.toLowerCase();
    if (title.includes("logistics")) return "Logistics";
    if (title.includes("fleet")) return "Fleet Management";
    return "General";
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const data = {
  //     name: formData.get("name"),
  //     phone: formData.get("phone"),
  //     email: formData.get("email"),
  //     city: formData.get("city"),
  //     state: formData.get("state"),
  //     jobTitle: formData.get("jobTitle"),
  //     department: formData.get("department"),
  //     resume: formData.get("resume"),
  //   };
  //   console.log("Form submitted:", data);
  //   if (data.resume) {
  //     console.log("Resume file:", data.resume.name);
  //   }
  //   closeModal();
  // };
 const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  try {
    // Fetch CSRF cookie first (optional but good if CSRF cookie needs to be refreshed)
    await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/csrf/`, {
      method: "GET",
      credentials: "include",
    });

    const csrfToken = Cookies.get('csrftoken'); // Must match Django's CSRF cookie name
    console.log('CSRF Token:', csrfToken);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/job-apply/`, {
      method: "POST",
      headers: {
        'X-CSRFToken': csrfToken,
      },
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Application submitted successfully:", result);
    alert("Application submitted successfully!");
    closeModal();
  } catch (error) {
    console.error("Error submitting application:", error);
    alert("Failed to submit application. Please try again."); 
  }
};

  return (
    <>
      <section className="hero" id="career">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title flex flex-column text-left">
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                Join Our Logistics Family
              </h2>
            </div>
            <button
              className="theme-btn wow fadeInUp"
              data-wow-delay=".5s"
              onClick={handleGeneralApplyClick}
            >
              Apply Now<i className="fa-regular fa-arrow-right" />
            </button>
          </div>
        </div>

        <div id="job-listings" className="job-listings">
          <div className="container">
            <div className="row pt-1 justify-content-center align-items-center">
              <div className="col-lg-7 col-md-12">
                <div className="jobs-grid p-3">
                  {jobs.length === 0 ? (
                    <h3 className="text-center">No job listings available at the moment.</h3>
                  ) : (
                    jobs.map((job, index) => (
                      <div
                        key={index}
                        className="job-card wow fadeInUp text-left"
                        data-wow-delay={`.${2 + index * 2}s`}
                      >
                        <h3>{job.title}</h3>
                        <p>
                          Location: {job.location} | Type: {job.type}
                        </p>
                        <p>{job.description}</p>
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="theme-btn apply-btn wow fadeInUp"
                          data-wow-delay=".4s"
                        >
                          Apply Now
                          <i className="fa-regular fa-arrow-right" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="col-lg-5 col-md-12">
                <div className="about-image">
                  <img
                    src={aboutData.image1}
                    alt="About Image"
                    className="wow fadeInLeft"
                    data-wow-delay=".2s"
                  />
                  <div className="about-image-2 wow fadeInUp" data-wow-delay=".4s">
                    <img src={aboutData.image2} alt="About Image 2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="application-info py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>How to Apply</h2>
              <p>
                Interested in joining us? Click "Apply Now" on any job listing.
                {/* or send
                your resume and cover letter to{" "}
                <a href="mailto:careers@jdmlogistics.com">hr.del1@jdmgroups.com</a>. */}
              </p>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal-content wow fadeInUp" role="dialog" aria-modal="true">
            <button className="close-btn" onClick={closeModal}>×</button>
            {isGeneralForm ? (
              <>
                <h3>General Application</h3>
                <p>Fill out the form below to apply for a position.</p>
              </>
            ) : (
              <>
                <h3>Apply for {selectedJob.title}</h3>
                <p>
                  Location: {selectedJob.location} | Type: {selectedJob.type}
                </p>
              </>
            )}
            <form onSubmit={handleSubmit}>
              {["name", "phone", "email", "city", "state"].map((field) => (
                <div key={field} className="form-group">
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input type={field === "email" ? "email" : "text"} id={field} name={field} required />
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  defaultValue={isGeneralForm ? "" : selectedJob?.title}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={getDepartmentFromJob(isGeneralForm ? "" : selectedJob?.title)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="resume">Upload CV</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(e) => {
                    const fileName = e.target.files[0]?.name;
                    if (fileName) console.log("Selected file:", fileName);
                  }}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn theme-btn">
                  Submit Application
                  <i className="fa-regular fa-arrow-right" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-left {
          text-align: left !important;
        }
        .job-card {
          background: #fff;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }
        .job-card:hover {
          transform: translateY(-5px);
        }
        .apply-btn {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .apply-btn {
            font-size: 10px;
          }
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 30px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }
        .close-btn {
          position: sticky;
          top: 10px;
          left: 100%;
          padding: 5px 8px;
          font-size: 24px;
          background: white;
          border: 1px solid #666;
          color: #666;
          width: fit-content;
          cursor: pointer;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group input {
          color: var(--text);
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
        }
        .form-group input[readonly] {
          background: #f5f5f5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default CareerSection;
