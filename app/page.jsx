
// "use client";
import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Brands from "@/components/homes/home-1/Brands";

import Categories from "@/components/homes/home-1/Categories";

import Hero from "@/components/homes/home-1/Hero";
import Lookbook from "@/components/homes/home-1/Lookbook";
import Marquee from "@/components/homes/home-1/Marquee";
import Products from "@/components/homes/home-1/Products";
// import { useApi } from "@/context/ApiContext"; // Importing the custom hook
// import { useState,useEffect } from "react";

export const metadata = {
  title: "Home 1 || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function Home() {
  // const { data, loading, error } = useApi(); // Fetching data from context
  // const [HeaderComponent, setHeaderComponent] = useState(null); // State to hold dynamic header component
  // const [FooterComponent, setFooterComponent] = useState(null); // State to hold dynamic footer component
  // const [headerError, setHeaderError] = useState(null); // State for header error
  // const [footerError, setFooterError] = useState(null); // State for footer error

  // useEffect(() => {
  //   if (data) {
  //     // Load Header Component
  //     if (data.header_id) {
  //       const loadHeader = async () => {
  //         try {
  //           const Header = await import(`@/components/headers/${data.header_id}`);
  //           setHeaderComponent(() => Header.default);
  //         } catch (error) {
  //           console.error(`Error importing the header component: ${data.header_id}`, error);
  //           setHeaderError("Failed to load header component.");
  //         }
  //       };
  //       loadHeader();
  //     }

  //     // Load Footer Component
  //     if (data.footer_id) {
  //       const loadFooter = async () => {
  //         try {
  //           const Footer = await import(`@/components/footers/${data.footer_id}`);
  //           setFooterComponent(() => Footer.default);
  //         } catch (error) {
  //           console.error(`Error importing the footer component: ${data.footer_id}`, error);
  //           setFooterError("Failed to load footer component.");
  //         }
  //       };
  //       loadFooter();
  //     }
  //   }
  // }, [data]);

  return (
    <>
      <Topbar1 />
        {/* Render Header */}
        {/* {HeaderComponent ? (
        <HeaderComponent />
      ) : (
        <p>{headerError || "No header found or failed to load header."}</p>
      )} */}
      <Header1 />
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <Lookbook />
      <Testimonials />
      <Brands />
      <ShopGram />
      <Features />
        {/* Render Footer */}
        {/* {FooterComponent ? (
        <FooterComponent />
      ) : (
        <p>{footerError || "No footer found or failed to load footer."}</p>
      )} */}
      <Footer1 />
    </>
  );
}
