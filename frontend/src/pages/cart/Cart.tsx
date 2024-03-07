// import React, { useState } from "react";
// import { AJAX } from "../../utils/getJson";
// import { API_URL } from "../../config";

// type cartProduct = {
//   productName: string;
//   productPrice: string;
//   productQuantity: string;
//   totalPrice: string;
// };

// type cartinfo = {
//   cart_total_price: string;
//   number_of_all_products: string;
// };

// const Cart = () => {
//   const [cart, setCart] = useState<cartProduct[]>([]);
//   const [cartInfo, setCartInfo] = useState<cartinfo>();

//   const fetchCart = async () => {
//     const cartData = await AJAX(`${API_URL}/cart`);

//     console.log(cartData);
//     cartData.map;
//     setCart(cartData.data);
//     // setCartInfo();
//   };

//   return <></>;
// };

// export default Cart;
