"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Sidebar from "./Sidebar";
import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import Sorting from "./Sorting";

export default function ShopSidebarleft() {
  const [gridItems, setGridItems] = useState(3);
  const [finalSorted, setFinalSorted] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // ✅ Store all products
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const { id } = useParams();

  // console.log("iddd   dd  : ", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://64facetscrm.com/theme/category_product_display");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        
        setAllProducts(result.product || []); // ✅ Store all products in state

        // ✅ Filter products only if `id` is available
        if (id) {
          const filteredProducts = result.product?.filter((prod) => prod.category_name.toLowerCase() ===  id.toLowerCase()) || [];
          setCategoryProducts(filteredProducts);
        } else {
          setCategoryProducts(result.product || []); // ✅ By default, show all products
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [id]);

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = categoryProducts.slice(indexOfFirstItem, indexOfLastItem);

  const getPagination = () => {
    let pages = [];
    if (totalPages <= 7) {
      pages = [...Array(totalPages)].map((_, i) => i + 1);
    } else {
      pages = [1, 2, 3, 4, 5, 6, 7];
      if (currentPage > 5) {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    return pages;
  };

  return (
    <section className="flat-spacing-1">
      <div className="container">
        <div className="tf-shop-control grid-3 align-items-center">
          <div className="tf-control-filter"></div>
          <ul className="tf-control-layout d-flex justify-content-center">
            {layouts.slice(0, 3).map((layout, index) => (
              <li
                key={index}
                className={`tf-view-layout-switch ${layout.className} ${gridItems === layout.dataValueGrid ? "active" : ""}`}
                onClick={() => setGridItems(layout.dataValueGrid)}
              >
                <div className="item">
                  <span className={`icon ${layout.iconClass}`} />
                </div>
              </li>
            ))}
          </ul>
          <div className="tf-control-sorting d-flex justify-content-end">
            <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
              <Sorting setFinalSorted={setFinalSorted} products={categoryProducts} />
            </div>
          </div>
        </div>
        <div className="tf-row-flex">
          <Sidebar allProducts={allProducts} />
          <div className="tf-shop-content">
            <ProductGrid allproducts={currentProducts} gridItems={gridItems} />

            {totalPages > 1 && (
              <ul className="pagination">
                {currentPage > 1 && (
                  <li>
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="pagination-btn">
                      &lt;
                    </button>
                  </li>
                )}

                {getPagination().map((page, index) =>
                  page === "..." ? (
                    <li key={index} className="pagination-ellipsis">...</li>
                  ) : (
                    <li key={index}>
                      <button
                        className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}

                {currentPage < totalPages && (
                  <li>
                    <button onClick={() => setCurrentPage(currentPage + 1)} className="pagination-btn">
                      &gt;
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          list-style: none;
          padding: 10px 0;
        }
        .pagination-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #ddd;
          background: #fff;
          font-size: 16px;
          cursor: pointer;
          margin: 0 5px;
          border-radius: 5px;
        }
        .pagination-btn.active {
          background: black;
          color: white;
          font-weight: bold;
        }
        .pagination-btn:hover {
          background: #f0f0f0;
        }
        .pagination-ellipsis {
          padding: 10px;
          font-size: 18px;
          color: #999;
        }
      `}</style>
    </section>
  );
}
