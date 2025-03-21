"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form from refreshing

    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("https://64facetscrm.com/theme/users", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.status) {
        setMessage("Registration Successful!"); // Success message
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.message || "Registration Failed!"); 
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="form-register-wrap">
          <div className="flat-title align-items-start gap-0 mb_30 px-0">
            <h5 className="mb_18">Register</h5>
            <p className="text_black-2">
              Sign up for early Sale access plus tailored new arrivals, trends,
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="" id="register-form">
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="first_name">
                  First name
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="last_name">
                  Last name
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="on"
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="email">
                  Email *
                </label>
              </div>
              <div className="tf-field style-1 mb_30">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <label className="tf-field-label fw-4 text_black-2" htmlFor="password">
                  Password *
                </label>
              </div>
              {message && (
              <p
                style={{
                  color: message.includes("Successful") ? "green" : "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {message}
              </p>
            )}
              <div className="mb_20">
                <button
                  type="submit"
                  className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                >
                  Register
                </button>
              </div>
              <div className="text-center">
                <Link href="/login" className="tf-btn btn-line">
                  Already have an account? Log in here
                  <i className="icon icon-arrow1-top-left" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
