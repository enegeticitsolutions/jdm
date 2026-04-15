"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Get CSRF cookie
    fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/csrf/`, {
      method: "GET",
      credentials: "include",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const csrfToken = Cookies.get("csrftoken");

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_V1}/contact-query/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Message submitted successfully:", result);
      alert("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="contact-section-22">
      <div className="container">
        <div className="contact-form-items">
          <div className="title text-center">
            <h2 className="wow fadeInUp">Get In Touch</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-user" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
                <div className="form-clt">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-user" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-phone" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
                <div className="form-clt">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="icon">
                    <i className="fa-regular fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay=".2s">
                <div className="form-clt">
                  <textarea
                    name="message"
                    placeholder="What’s on your mind"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <div className="icon">
                    <i className="fa-sharp fa-light fa-pencil" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay=".4s">
                <button type="submit" className="theme-btn w-100">
                  SEND MESSAGE NOW
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
