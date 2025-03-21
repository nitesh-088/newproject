"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  const router = useRouter();
  const [message, setMessage] = useState(""); // State for success/failure message
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("https://64facetscrm.com/theme/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.status) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        // alert("Login Successful!");
        localStorage.setItem("user", JSON.stringify(data.user)); // यूजर डेटा स्टोर करें
        setMessage("Login Successful!"); // Set success message
        setTimeout(() => router.push("/"), 2000); // Redirect after 2 seconds
      } else {
        setMessage(data.message || "Login Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    }
  };
  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="tf-grid-layout lg-col-2 tf-login-wrap">
          <div className="tf-login-form">
            <div id="recover">
              <h5 className="mb_24">Reset your password</h5>
              <p className="mb_30">
                We will send you an email to reset your password
              </p>
              <div>
                <form onSubmit={(e) => e.preventDefault()} className="">
                  <div className="tf-field style-1 mb_15">
                    <input
                      className="tf-field-input tf-input"
                      placeholder=""
                      required
                      type="email"
                      autoComplete="abc@xyz.com"
                      id="property3"
                      name="email"
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#login" className="tf-btn btn-line">
                      Cancel
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Reset password
                    </button>
                    
                  </div>
                </form>
              </div>
            </div>
            
            <div id="login">
              <h5 className="mb_36">Log in</h5>
              <div>
                <form 
                onSubmit={handleSubmit}
                // onSubmit={(e) => e.preventDefault()}
                >
                  <div className="tf-field style-1 mb_15">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="email"
                      autoComplete="abc@xyz.com"
                      id="property3"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="tf-field style-1 mb_30">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="password"
                      id="property4"
                      name="password"
                      autoComplete="current-password"
                      value={formData.password}
          onChange={handleChange}
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property4"
                    >
                      Password *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#recover" className="tf-btn btn-line">
                      Forgot your password?
                    </a>
                  </div>
                  {message && (
                <p
                  style={{
                    color: message.includes("Success") ? "green" : "red",
                    fontWeight: "bold",
                    textAlign: "start",
                  }}
                >
                  {message}
                </p>
              )}
                  <div className="">
                    
                    <button
                      type="submit"
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="tf-login-content">
            <h5 className="mb_36">I'm new here</h5>
            <p className="mb_20">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
            <Link href={`/register`} className="tf-btn btn-line">
              Register
              <i className="icon icon-arrow1-top-left" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
