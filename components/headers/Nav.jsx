"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { products1 } from "@/data/products";
import { ProductCard } from "../shopCards/ProductCard";
import { Navigation } from "swiper/modules";
import { useApi , ApiProvider } from "@/context/ApiContext";
import {
  allHomepages,
  blogLinks,
  demoItems,
  pages,
  productDetailPages,
  productsPages,
} from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
  const pathname = usePathname();
  const { data, loading, error } = useApi();

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!data || !data.header) return <div>No data available</div>;

  const { header } = data;
  const menuItems = header.menu;

  // const [menu, setMenu] = useState([]); // menu डेटा स्टोर करने के लिए state
  // const [loading, setLoading] = useState(true); // लोडिंग स्टेट
  // const [error, setError] = useState(null); // एरर स्टेट
  // const fetchMenu = async () => {
  //   try {
  //     const response = await fetch("https://64facetscrm.com/theme/menu_Display");
  //     if (!response.ok) {
  //       throw new Error(`HTTP Error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("API Response:", data);

  //     // अगर डेटा का 'status' true है, तो 'data' को सेट करें
  //     if (data.status === true) {
  //       setMenu(data.data || []);
  //     } else {
  //       throw new Error("Invalid API response");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching the menu:", err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(
        (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem.length) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };
  return (
    <>
      {" "}

      {/* <ul className="menu-list" style={{ display: 'flex', flexWrap: 'wrap' }}> */}
  {/* {loading && <li>Loading...</li>}
  {error && <li>Error: {error}</li>} */}
  { menuItems.map((item, index) => (
    <li className="menu-item" key={item.id}>
      <a
        href="#"
        className={`item-link ${Linkfs} ${textColor} ${isMenuActive(item) ? "activeMenu" : ""}`}
      >
        {item.name}  {/* Dynamically displaying the name from API */}
        {isArrow ? <i className="icon icon-arrow-down" /> : ""}
      </a>
      <div className="sub-menu mega-menu">
        <div className="container">
          <div className="row">
            {/* Looping for the content of mega-menu */}
            {item.mega_menu_items && item.mega_menu_items.map((megaMenuItem, megaIndex) => (
            <div className="col-lg-2" key={megaIndex}>
              <div className="mega-menu-item">
                <div className="menu-heading">{megaMenuItem.name} </div> {/* Displaying name of mega_menu_item */}
                <ul className="menu-list">
                  {/* Assuming links inside mega_menu_items */}


                  {megaMenuItem.sub_menu_items && megaMenuItem.sub_menu_items.length > 0 && (
  <ul className="sub-menu-items">
    {megaMenuItem.sub_menu_items.map((subMenuItem) => (
      <li key={subMenuItem.id} className="sub-menu-item">
        <div className="sub-menu-content">
          {/* Image on the left */}
          {subMenuItem.image && (
            <img style={{width:'20px' }}
              src={subMenuItem.image}
              alt={subMenuItem.name}
              className="sub-menu-image"
            />
          )}
          {/* Sub-menu name */}
          <span>{subMenuItem.name}</span>
        </div>
      </li>
    ))}
  </ul>
)}





                  
                  {/* {megaMenuItem.links && megaMenuItem.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={`menu-link-text link ${isMenuActive(link) ? "activeMenu" : ""}`}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))} */}
                </ul>
              </div>
            </div>
          ))}
            {/* Assuming images or collections related to menu */}
            {item.image && (
              <div className="col-lg-3">
                <div className="collection-item hover-img">
                  <div className="collection-inner">
                    <Link href={item.urls || "#"} className="collection-image img-style">
                      <Image
                        className="lazyload"
                        data-src={item.image}
                        alt={item.name}
                        src={item.image}
                        width="1000"
                        height="1215"
                      />
                      
                    </Link>
                    {/* <div className="collection-content"> */}
                      {/* <Link href={item.urls || "#"} className="tf-btn btn-xl collection-title fs-16"> */}
                        {/* <span>{item.name}</span> */}
                        {/* hii */}
                        {/* <i className="icon icon-arrow1-top-left" /> */}
                      {/* </Link> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  ))}
{/* </ul> */}
      {/* <li className="menu-item "  >
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${
            isMenuActive(allHomepages) ? "activeMenu" : ""
          } `}
        >
          
          Home
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row-demo">
              {demoItems.map((item, index) => (
                <div
                  className={`demo-item ${
                    isMenuActive(item) ? "activeMenu" : ""
                  } `}
                  key={index}
                >
                  <Link href={item.href}>
                    <div className="demo-image position-relative">
                      <Image
                        className="lazyload"
                        data-src={item.src}
                        alt={item.alt}
                        src={item.src}
                        width="300"
                        height="329"
                      />
                      {item.labels && (
                        <div className="demo-label">
                          {item.labels.map((label, labelIndex) => (
                            <span
                              key={labelIndex}
                              className={label.className || undefined}
                            >
                              {label.text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="demo-name">{item.name}</span>w
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center view-all-demo">
              <a
                href="#modalDemo"
                data-bs-toggle="modal"
                className="tf-btn btn-xl btn-fill radius-3 animate-hover-btn fw-6"
              >
                <span>View all demos (34+)</span>
                <i className="icon icon-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </li> */}
      {/* <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${
            isMenuActive(productsPages) ? "activeMenu" : ""
          } `}
        >
          Shop
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {productsPages.map((menu, index) => (
                <div className="col-lg-2" key={index}>
                  <div className="mega-menu-item">
                    <div className="menu-heading">{menu.heading}</div>
                    <ul className="menu-list">
                      {menu.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className={`menu-link-text link ${
                              isMenuActive(link) ? "activeMenu" : ""
                            }`}
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="col-lg-3">
                <div className="collection-item hover-img">
                  <div className="collection-inner">
                    <Link
                      href={`/home-men`}
                      className="collection-image img-style"
                    >
                      <Image
                        className="lazyload"
                        data-src="/images/collections/collection-1.jpg"
                        alt="collection-demo-1"
                        src="/images/collections/collection-1.jpg"
                        width="1000"
                        height="1215"
                      />
                    </Link>
                    <div className="collection-content">
                      <Link
                        href={`/home-men`}
                        className="tf-btn hover-icon btn-xl collection-title fs-16"
                      >
                        <span>Men</span>
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="collection-item hover-img">
                  <div className="collection-inner">
                    <Link
                      href={`/shop-women`}
                      className="collection-image img-style"
                    >
                      <Image
                        className="lazyload"
                        data-src="/images/collections/collection-2.jpg"
                        alt="collection-demo-1"
                        src="/images/collections/collection-2.jpg"
                        width="500"
                        height="607"
                      />
                    </Link>
                    <div className="collection-content">
                      <Link
                        href={`/shop-women`}
                        className="tf-btn btn-xl collection-title fs-16 hover-icon"
                      >
                        <span>Women</span>
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li> */}
      {/* <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${
            isMenuActive(productsPages) ? "activeMenu" : ""
          } `}
        >
         <p>{menu.length > 0 ? menu[0].name : "No menu items available"}</p>

          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {productsPages.map((menu, index) => (
                <div className="col-lg-2" key={index}>
                  <div className="mega-menu-item">
                    <div className="menu-heading">{menu.heading}</div>
                    <ul className="menu-list">
                      {menu.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className={`menu-link-text link ${
                              isMenuActive(link) ? "activeMenu" : ""
                            }`}
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="col-lg-3">
                <div className="collection-item hover-img">
                  <div className="collection-inner">
                    <Link
                      href={`/home-men`}
                      className="collection-image img-style"
                    >
                      <Image
                        className="lazyload"
                        data-src="/images/collections/collection-1.jpg"
                        alt="collection-demo-1"
                        src="/images/collections/collection-1.jpg"
                        width="1000"
                        height="1215"
                      />
                    </Link>
                    <div className="collection-content">
                      <Link
                        href={`/home-men`}
                        className="tf-btn hover-icon btn-xl collection-title fs-16"
                      >
                        <span>Men</span>
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="collection-item hover-img">
                  <div className="collection-inner">
                    <Link
                      href={`/shop-women`}
                      className="collection-image img-style"
                    >
                      <Image
                        className="lazyload"
                        data-src="/images/collections/collection-2.jpg"
                        alt="collection-demo-1"
                        src="/images/collections/collection-2.jpg"
                        width="500"
                        height="607"
                      />
                    </Link>
                    <div className="collection-content">
                      <Link
                        href={`/shop-women`}
                        className="tf-btn btn-xl collection-title fs-16 hover-icon"
                      >
                        <span>Women</span>
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(productDetailPages) ? "activeMenu" : ""
          }`}
        >
          Products
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {productDetailPages.map((menuItem, index) => (
                <div key={index} className="col-lg-2">
                  <div className="mega-menu-item">
                    <div className="menu-heading">{menuItem.heading}</div>
                    <ul className="menu-list">
                      {menuItem.links.map((linkItem, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={linkItem.href}
                            className={`menu-link-text link position-relative  ${
                              isMenuActive(linkItem) ? "activeMenu" : ""
                            }`}
                          >
                            {linkItem.text}
                            {linkItem.extra}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="col-lg-4">
                <div className="menu-heading">Best seller</div>
                <div className="hover-sw-nav hover-sw-2">
                  <Swiper
                    dir="ltr"
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".snmpn1",
                      nextEl: ".snmnn1",
                    }}
                    slidesPerView={2}
                    spaceBetween={30}
                    className="swiper tf-product-header wrap-sw-over"
                  >
                    {[...products1]
                      .slice(0, 4)

                      .map((elm, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                          <ProductCard product={elm} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div className="nav-sw nav-next-slider nav-next-product-header box-icon w_46 round snmpn1">
                    <span className="icon icon-arrow-left" />
                  </div>
                  <div className="nav-sw nav-prev-slider nav-prev-product-header box-icon w_46 round snmnn1">
                    <span className="icon icon-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(pages) ? "activeMenu" : ""
          }`}
        >
          Pages
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {pages.map((item, index) => (
              <li key={index} className={item.links ? "menu-item-2 " : ""}>
                {item.href.includes("#") ? (
                  <a
                    href={item.href}
                    className={`${item.className} ${
                      isMenuActive(item.links) ? "activeMenu" : ""
                    }`}
                  >
                    {item.text}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`${item.className}  ${
                      isMenuActive(item) ? "activeMenu" : ""
                    }`}
                    style={{ position: "relative" }}
                  >
                    {item.text}{" "}
                    {item.label && (
                      <div className="demo-label">
                        <span className="demo-new">{item.label}</span>
                      </div>
                    )}
                  </Link>
                )}

                {item.links && (
                  <div className="sub-menu submenu-default">
                    <ul className="menu-list">
                      {item.links.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={`${subItem.className} ${
                              isMenuActive(subItem) ? "activeMenu" : ""
                            }`}
                          >
                            {subItem.text}
                            {subItem.label && (
                              <div className="demo-label">
                                <span className="demo-new">
                                  {subItem.label}
                                </span>
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(blogLinks) ? "activeMenu" : ""
          }`}
        >
          Blog
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu links-default">
          <ul className="menu-list">
            {blogLinks.map((linkItem, index) => (
              <li key={index}>
                <Link
                  href={linkItem.href}
                  className={`menu-link-text link text_black-2  ${
                    isMenuActive(linkItem) ? "activeMenu" : ""
                  }`}
                >
                  {linkItem.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li> */}
    </>
  );
}
