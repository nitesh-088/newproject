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

  const [message, setMessage] = useState(""); // Success/Error message state
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    setMessage(""); // Reset message before request
    setMessageType("");

    try {
      const response = await fetch("https://64facetscrm.com/theme/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status) {
        setMessage("Registration Successful!");
        setMessageType("success");

        // Reset form after successful registration
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "#login";
        }, 2000);
      } else {
        setMessage(data.message || "Registration Failed!");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
      setMessageType("error");
    }
  };

  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="register"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Register</div>
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
          </div>
          <div className="tf-login-form">
            {message && (
              <p
                style={{
                  color: messageType === "success" ? "green" : "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {message}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <label className="tf-field-label">First name</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <label className="tf-field-label">Last name</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="tf-field-label">Email *</label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className="tf-field-label">Password *</label>
              </div>
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                  >
                    Register
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#login"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    Already have an account? Log in here
                    <i className="icon icon-arrow1-top-left" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
