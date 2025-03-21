"use client";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useApi } from "@/context/ApiContext";
import { useContext } from "react";


export default function Hero() {
  const { data, loading } = useApi();

  if (loading) return <div>Loading...</div>;
  if (!data || !data.header) return <div>No data available</div>;

  const { slider } = data;
  const slideItems = slider.slider_img;

  return (
    <section className="tf-slideshow slider-collection hover-sw-nav">
      <Swiper
        dir="ltr"
        slidesPerView={3}
        spaceBetween={5}
        centeredSlides={false}
        loop={false}
        speed={1000}
        autoplay={{
          delay: 2000,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true, el: ".spb4" }}
        navigation={{
          prevEl: ".snbp4",
          nextEl: ".snbn4",
        }}
        breakpoints={{
          768: { slidesPerView: 3 },
          0: { slidesPerView: 1 },
        }}
      >
        {slideItems.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="collection-item hover-img">
              <div className="collection-inner">
                {/* Provide a fallback URL if `slide.link` is empty */}
                <Link href={slide.link || "#"} className="collection-image img-style" style={{height:"806"}}> 
                  <Image
                    alt={slide.title || "Image"}
                    src={slide.image} 
                    width="631"
                    height="806"
                    priority
                  />
                </Link>
                <div className="collection-content">
                  <Link
                    href={slide.link || "#"}
                    className="tf-btn hover-icon collection-title radius-3"
                  >
                    <span>{slide.title} </span>
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="nav-sw nav-next-slider navigation-next-slider box-icon w_46 round snbp4">
        <span className="icon icon-arrow-left" />
      </div>
      <div className="nav-sw nav-prev-slider navigation-prev-slider box-icon w_46 round snbn4">
        <span className="icon icon-arrow-right" />
      </div>
      <div className="sw-dots style-2 sw-pagination-slider justify-content-center spb4" />
    </section>
  );
}
