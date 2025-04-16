"use client";
import { products1 } from "@/data/products";
import React, { useState } from "react";
import { ProductCard } from "../../shopCards/ProductCard";
import { useApi, ApiProvider } from "@/context/ApiContext";

export default function Products() {
  const { data, loading } = useApi();

  if (loading) return <div>Loading...</div>;
  if (!data || !data.product) return <div>No data available</div>;

  const { product } = data;
  const [visibleProducts, setVisibleProducts] = useState(product.slice(0, 20));
  const [index, setIndex] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = () => {
    setIsLoading(true);

    setTimeout(() => {
      const nextProducts = product.slice(index, index + 20);
      setVisibleProducts((prev) => [...prev, ...nextProducts]);
      setIndex(index + 20);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="flat-spacing-5 pt_0 flat-seller">
      <div className="container">
        <div className="flat-title">
          <span className="title wow fadeInUp" data-wow-delay="0s">
            Best Seller
          </span>
          <p className="sub-title wow fadeInUp" data-wow-delay="0s">
            Shop the Latest Styles: Stay ahead of the curve with our newest arrivals
          </p>
        </div>
        <div className="grid-layout wow fadeInUp" data-wow-delay="0s" data-grid="grid-4">
          {visibleProducts.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </div>
        {index < product.length && (
          <div className="tf-pagination-wrap view-more-button text-center">
            <button
              className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${
                isLoading ? "loading" : ""
              } `}
              onClick={handleLoad}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
