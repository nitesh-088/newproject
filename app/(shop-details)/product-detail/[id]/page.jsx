"use client";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";

import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import { useApi,ApiProvider } from "@/context/ApiContext";

// export const metadata = {
//   title: "Shop Details || Ecomus - Ultimate Nextjs Ecommerce Template",
//   description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };
// import { allProducts } from "@/data/products";
import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";
export default function page({ params }) {
  const{data , loading } = useApi();
  
    if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    if (!data || !data.product) return <div>No data available</div>;
    console.log("Params:", params); 
    // const {product} = data;
    // const product = data.product.find((item) => item.style_id === params.id) || null;
    const product = data.product.find((item) => item.style_id === String(params.id)) || null;

    console.log("product : ",product)
    if (!product) return <div>Product not found</div>;

  // const product =
  //   allProducts.filter((elm) => elm.id == params.id)[0] || allProducts[0];
  return (
    <>
      <Header2 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home page
              </Link>
              <i className="icon icon-arrow-right" />

              <span className="text">
                {product.style_id }
              </span>
            </div>
            <ProductSinglePrevNext currentId={product.id} />
          </div>
        </div>
      </div>
      <DetailsOuterZoom product={product} />
      <ShopDetailsTab />
      <Products />
      <RecentProducts />
      <Footer1 />
    </>
  );
}
