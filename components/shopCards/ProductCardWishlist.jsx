"use client";
import { useState } from "react";
import Image from "next/image";
import $ from "jquery";
import Link from "next/link";
import { useEffect } from "react";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
import Script from "next/script";
export const ProductCardWishlist = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    removeFromWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("jquery");
    }
  }, []);
  const defaultImage = "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw276a9a4b/images/hi-res/50DXA1FIJAA10_2.jpg?sw=480&sh=480" ;

  console.log("use contecy ",useContextElement())
  return (
    

    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.img}
            src={product.img ? product.img : defaultImage} 
            alt="image-product"
            width={720}
            height={1005}
          />
         <Image
  className="lazyload img-hover"
  data-src={product.imgHoverSrc || defaultImage}
  src={product.imgHoverSrc || defaultImage}
  alt="image-product"
  width={720}
  height={1005}
/>
        </Link>
        <div className="list-product-btn type-wishlist">
        <a
  onClick={() => removeFromWishlist(product.id)}
  className="box-icon bg_white wishlist"
>
  <span className="tooltip">Remove Wishlist</span>
  <span className="icon icon-delete" />
</a>

        </div>

        <div className="list-product-btn">
          <a
            href="#quick_add"
            onClick={() => setQuickAddItem(product.id)}
            data-bs-toggle="modal"
            className="box-icon bg_white quick-add tf-btn-loading"
          >
            <span className="icon icon-bag" />
            <span className="tooltip">Quick Add</span>
          </a>
          <a onDoubleClick={() => {
  addToWishlist(product.id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}}
            onClick={() => {
              addToWishlist(product.id);
              $("html, body").animate({ scrollTop: 0 }, 800); // Smooth Scroll Effect
            }}
            className="box-icon bg_white wishlist btn-icon-action"
          >
            <span
              className={`icon icon-heart ${
                isAddedtoWishlist(product.id) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {isAddedtoWishlist(product.id) ? "Already Wishlisted" : "Add to Wishlist"}
            </span>
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon bg_white compare btn-icon-action"
          >
            <span
              className={`icon icon-compare ${
                isAddedtoCompareItem(product.id) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {" "}
              {isAddedtoCompareItem(product.id)
                ? "Already Compared"
                : "Add to Compare"}
            </span>
            <span className="icon icon-check" />
          </a>
          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon bg_white quickview tf-btn-loading"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
        {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )}
        {product.sizes && (
          <div className="size-list">
            {product.sizes.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.loc}
        </Link>
        <span className="price">${(product.ratail_price_int ?? 0)}</span>
        {product.colors && (
          <ul className="list-color-product">
            {product.colors.map((color) => (
              <li
                className={`list-color-item color-swatch ${
                  currentImage == color.imgSrc ? "active" : ""
                } `}
                key={color.name}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <span className="tooltip">{color.name}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <Image
                  className="lazyload"
                  data-src={color.imgSrc}
                  src={color.imgSrc}
                  alt="image-product"
                  width={720}
                  height={1005}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
