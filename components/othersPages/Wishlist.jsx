"use client";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { ProductCardWishlist } from "../shopCards/ProductCardWishlist";
import Link from "next/link";
import { useApi } from "@/context/ApiContext";

export default function Wishlist() {
  const { wishList } = useContextElement(); // Wishlist IDs
  const [wishListItems, setWishListItems] = useState([]);
  const defaultImage = "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw276a9a4b/images/hi-res/50DXA1FIJAA10_2.jpg?sw=480&sh=480" ;

  const { data, loading } = useApi(); // API data
  // const {product} = data;

  // useEffect(() => {
  //   if (wishList?.length > 0 && data?.product?.length > 0) {
  //     const filteredItems = data.product.filter((product) => wishList.includes(product.id));
  //     setWishListItems(filteredItems);
  //   } else {
  //     setWishListItems([]);
  //   }
  // }, [wishList, data?.product]); // ✅ Runs when wishlist or product data changes
  useEffect(() => {
    if (wishList?.length > 0 && data?.product?.length > 0) {
      const filteredItems = data.product.filter((product) => wishList.includes(product.id));
      setWishListItems(filteredItems);
    } else {
      setWishListItems([]);
    }
}, [wishList, data?.product]); 
  
  if (loading) return <div>Loading...</div>;
  if (!data || !data.product) return <div>No data available</div>;
console.log("hii console");
console.log("hii ",wishListItems);
  return (  
    <section className="flat-spacing-2">
      <div className="container">
        <div className="grid-layout wrapper-shop" data-grid="grid-4">
          {wishListItems.length > 0 ? (
            wishListItems.map((product) => (
              <ProductCardWishlist key={product.id} product={product} />
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
        {!wishListItems.length && (
          <div className="row align-items-center w-100" style={{ rowGap: "20px" }}>
            <div className="col-lg-3 col-md-6 fs-18">Your wishlist is empty</div>
            <div className="col-lg-3 col-md-6">
              <Link href="/shop-default" className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center">
                Explore Products!
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
