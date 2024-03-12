import React, { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { API_URL } from "../../config";
import Button from "../../components/Button";
import removeProductCart from "./hooks/removeProductCart";
import clearCart from "./hooks/clearCart";

type cartProduct = {
  id: number;
  product_price: number;
  product_quantity: number;
  name: string;
  total_price: number;
};

type cartInfo = { cart_total_price: number; number_of_all_products: number };

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<cartProduct[]>([]);
  const [cartInfo, setCartInfo] = useState<cartInfo>({
    cart_total_price: 0,
    number_of_all_products: 0,
  });

  const fetchCartData = async () => {
    try {
      const result = await AJAX(`${API_URL}/cart/`);
      console.log(result);
      setCartProducts(result.data);
      setCartInfo({
        cart_total_price: result.cart_total_price,
        number_of_all_products: result.number_of_all_products,
      });
      console.log(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <>
      <div className="cart-product-container">
        {cartProducts.length !== 0 ? (
          cartProducts.map((product, index) => (
            <div className="cart-product" id={`${product.name}-${index}`}>
              <p>{product.name}</p>
              <p>{product.total_price}</p>
              <p>{product.product_quantity}</p>
              <p>{product.product_price}</p>
              <Button
                onClick={() => {
                  removeProductCart(product.id);
                }}
              >
                Remove
              </Button>
            </div>
          ))
        ) : (
          <p>no products in cart</p>
        )}
      </div>
      <div>
        <Button
          onClick={() => {
            clearCart();
          }}
        >
          Remove all products
        </Button>
      </div>
    </>
  );
};

export default Cart;
