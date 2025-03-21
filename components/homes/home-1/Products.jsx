"use client";
import { products1 } from "@/data/products";
import React, { useState } from "react";
import { ProductCard } from "../../shopCards/ProductCard";
import { useApi,ApiProvider } from "@/context/ApiContext";

export default function Products() {

  const{data , loading } = useApi();

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!data || !data.product) return <div>No data available</div>;

  const {product} = data;
  // const currentCurrency = "usd";
  // const changeCurrency = "ind";

  // const dollar_rate = 83;
  // const indian_rate = 1;


  // let price = product[2].ratail_price_int; 
  // console.log('price '+price);

  // let indian =  price/dollar_rate;
  
//   console.log(product.length);
//   let productprice = []; 
//   if(productprice)
//   for(let i=1; i>product.length; i++){
//   // let indian[i] =  product[i].ratail_price_int/dollar_rate;
//   console.log(product[i].ratail_price_int/dollar_rate);
// //   productprice.push(indain);
// // console.log("loop "+indian)
//   }

//   console.log(productprice);
  // if(currentCurrency == "indain"){
  // let indian =  price/dollar_rate;
   
  // }

  // console.log("indain ", indian);




  // console.log('hi jdkjsa ',product);
  // const [loadings, setLoading] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  // const [products, setproducts] = useState([...product]);
  // const handleLoad = () => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     products((pre) => [...pre, ...product.slice(0, 12)]);
  //     setLoading(false);
  //     setLoaded(true);
  //   }, 20000);
  // };

  return (
    <section className="flat-spacing-5 pt_0 flat-seller">
      <div className="container">
        <div className="flat-title">
          <span className="title wow fadeInUp" data-wow-delay="0s">
            Best Seller {product.style_id}
            
          </span>
          <p className="sub-title wow fadeInUp" data-wow-delay="0s">
            Shop the Latest Styles: Stay ahead of the curve with our newest
            arrivals 
          </p>
        </div>
        <div
          className="grid-layout wow fadeInUp"
          data-wow-delay="0s"
          data-grid="grid-4"
        >
          {product.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </div>
        {!loading && (
          <div className="tf-pagination-wrap view-more-button text-center">
            <button
              className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${
                loading ? "loading" : ""
              } `}
              onClick={() => handleLoad()}
            >
              <span className="text">Load more</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
