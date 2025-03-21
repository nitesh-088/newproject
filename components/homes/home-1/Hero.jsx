"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useApi,ApiProvider } from "@/context/ApiContext";

export default function Hero() {

  const {data , loading} = useApi();
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!data || !data.header) return <div>No data available</div>;

  
  const { slider } = data;
  const slideItems = slider.slider_img;

  // const [sliders, setSliders] = useState(null); // State to store sliders data
  // const [loading, setLoading] = useState(true); // Loading state
  // const [error, setError] = useState(null); // Error state

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://64facetscrm.com/theme/slider_Di  splay');
  //       const result = await response.json(); // Parse the JSON response
  //       // console.log("sliders ", result); // Log the entire result to inspect the API response

  //       if (result.status === true) {
  //         setSliders(result.data); // Store the slider data in state
  //       } else {
  //         setError('Invalid response status');
  //       }
  //     } catch (error) {
  //       setError(error.message); // Set error if something goes wrong
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching data
  //     }
  //   };

  //   fetchData(); // Fetch data when the component mounts
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading message while data is being fetched
  // }

  // if (error) {
  //   return <div>Error: {error}</div>; // Show error message if any error occurs
  // }

  return (
    <div className="tf-slideshow slider-effect-fade position-relative ">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        modules={[Pagination]}
        pagination={{ clickable: true, el: ".sp1" }}
        speed={1000}
      >
        {/* Map through the sliders data */};
        {slideItems.map((slide, index) => (
          <SwiperSlide className="swiper-slide"  key={index}>
            <div className="wrap-slider">
              <Image
                priority
                alt="fashion-slideshow"
                src={slide.image} // Assuming 'imgSrc' is a valid field in API data
                width="2000"
                height="1125"
              />
              <div className="box-content">
                <div className="container">
                  <h1 className="fade-item fade-item-1">
                    {slide.title.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="fade-item fade-item-2">{slide.description }</p>
                  <Link
                    href={`/shop-default`}
                    className="fade-item fade-item-3 tf-btn btn-fill animate-hover-btn btn-xl radius-3"
                  >
                    <span>{slide.btnText}Shop Now</span>
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sp1 sw-pagination-slider justify-content-center" />
        </div>
      </div>
    </div>
  );
}
