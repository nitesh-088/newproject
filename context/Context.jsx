"use client";
import Wishlist from "@/components/othersPages/Wishlist";
import { allProducts } from "@/data/products";
import { openCartModal } from "@/utlis/openCartModal";
// import { openCart } from "@/utlis/toggleCart";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  // const addProductToCart = (id, qty) => {
  //   if (!cartProducts.filter((elm) => elm.id == id)[0]) {
  //     const item = {
  //       ...allProducts.filter((elm) => elm.id == id)[0],
  //       quantity: qty ? qty : 1,
  //     };
  //     setCartProducts((pre) => [...pre, item]);
  //     openCartModal();

  //     // openCart();
  //   }
  // };
  const addProductToCart = (id, qty = 1) => {

    alert("poduct_id :" , id);
    // Pehle localStorage aur sessionStorage se cart data nikal lo
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check karo ki product already cart me hai ya nahi
    let existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
        // Agar product pehle se hai to uski quantity badha do
        existingProduct.quantity += qty;
    } else {
        // Naya product cart me add karo
        const item = {
            ...allProducts.find((elm) => elm.id === id), // Product ka data lo
            quantity: qty
        };
        cart.push(item);
    }

    // Cart ko localStorage & sessionStorage dono me save karo
    localStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Cart state update karo
    setCartProducts(cart);

    // Cart modal open karo (Agar chahiye to)
    openCartModal();
};


  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };

  // const addToWishlist = (id) => {
  //   if (!wishList.includes(id)) {
  //     setWishList((pre) => [...pre, id]);
  //   } else {
  //     setWishList((pre) => [...pre].filter((elm) => elm != id));
  //   }
  // };
  const router = useRouter();


  const addToWishlist = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please login first to add items to your wishlist!");
        router.push("/login");
        return;
    }

    const user_id = user.id;
    let wishlist = JSON.parse(localStorage.getItem(`wishlist_${user_id}`)) || []; // User-specific wishlist

    if (!wishlist.includes(id)) {
        wishlist.push(id);
        localStorage.setItem(`wishlist_${user_id}`, JSON.stringify(wishlist)); // Store wishlist separately for each user

        try {
            const response = await fetch("https://64facetscrm.com/theme/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id, product_ids: wishlist }),
            });

            const data = await response.json();
            if (data.status) {
                console.log("Wishlist updated successfully:", data);
                setWishList(wishlist);
            } else {
                console.error("Failed to update wishlist:", data.message);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    } else {
        console.log(`Product ${id} is already in the wishlist.`);
    }
};


  // console.log("wishlist",wishList);
  const removeFromWishlist = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user  :"  ,user);

    const user_id = user.id;
    let wishlist = JSON.parse(localStorage.getItem(`wishlist_${user_id}`)) || [];

    // ✅ Wishlist se product remove karna
    const updatedWishlist = wishlist.filter(item => item !== id);
    localStorage.setItem(`wishlist_${user_id}`, JSON.stringify(updatedWishlist));

    setWishList(updatedWishlist); 
    console.log(updatedWishlist);
  
};



  // const removeFromWishlist = (id) => {
  //   if (wishList.includes(id)) {
  //     setWishList((pre) => [...pre.filter((elm) => elm != id)]);
  //   }
  // };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };  
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem("wishlist"));
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
