"use client";
import Image from "next/image";
import { slideshowData } from "@/data/heroslides";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useApi } from "@/context/ApiContext";

export default function Hero() {
   const { data, loading } = useApi();
    
      if (loading) return <div>Loading...</div>;
      if (!data || !data.header) return <div>No data available</div>;
    
      const { slider } = data;
      const slideItems = slider.slider_img;
  return (
    <section className="tf-slideshow slider-effect-fade slider-home-5 position-relative">
      <Swiper
        dir="ltr"
        slidesPerView={1}
        centeredSlides={false}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 2000 }}
        speed={1000}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, el: ".spd125" }}
      >
        {slideItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <Image
                className="lazyload"
                data-src={item.imgSrc}
                alt={item.imgAlt}
                src={item.image}
                width={2000}
                height={1125}
                priority
              />
              <div className="box-content text-center">
                <div className="container">
                  <h1 className="fade-item fade-item-1 text-white heading">
                    {item.title}
                  </h1>
                  <p className="fade-item fade-item-2 text-white">
                    {item.description}
                  </p>
                  <Link
                    href={`/shop-collection-list`}
                    className="fade-item fade-item-3 tf-btn btn-light-icon animate-hover-btn btn-xl radius-3"
                  >
                    <span>Shop collection</span>
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="sw-dots style-2 dots-white sw-pagination-slider justify-content-center spd125" />
      </div>
    </section>
  );
}
