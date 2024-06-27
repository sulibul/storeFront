import { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { API_URL } from "../../config";
import clearCart from "./hooks/clearCart";
import "../../assets/styles/Cart.scss";
import Button from "../../components/Button";
import CartCard from "../../components/cartComponents/CartCard";
import postOrder from "./hooks/postOrder";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

type CartProduct = {
  id: number;
  product_price: number;
  product_quantity: number;
  name: string;
  total_price: number;
  product_img: string;
};

type CartInfo = {
  cart_total_price: number;
  number_of_all_products: number;
};

const Cart = () => {
  let navigate = useNavigate();
  let { user, logoutUser } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartInfo, setCartInfo] = useState<CartInfo>({
    cart_total_price: 0,
    number_of_all_products: 0,
  });

  const waitOneSecond = () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  const fetchCartData = async () => {
    try {
      await waitOneSecond();
      const result = await AJAX(`${API_URL}/cart/`);
      setCartProducts(result.data);
      setCartInfo({
        cart_total_price: result.cart_total_price,
        number_of_all_products: result.number_of_all_products,
      });
    } catch (err) {
      alert(err);
    }
  };

  const updateView = (id: number) => {
    setCartProducts(
      cartProducts.filter((product: CartProduct) => product.id !== id)
    );
  };
  const routeChange = () => {
    navigate("/user/login/", { replace: true });
    alert("You need to be logged in to make an order.");
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <>
      <div className="cart-product-container">
        {cartProducts.length !== 0 ? (
          cartProducts.map((product: CartProduct, index: number) => (
            <CartCard
              key={product.id}
              product={product}
              index={index}
              removeProduct={updateView}
            />
          ))
        ) : (
          <p className="empty-cart-alert">no products in cart</p>
        )}
      </div>
      <div className="lower-part-cart">
        <Button
          className="remove-cart"
          onClick={() => {
            clearCart();
            setCartProducts([]);
          }}
        >
          Remove all products
        </Button>
        <p>Value of products: {cartInfo.cart_total_price}$</p>
        <Button
          className="make-order"
          onClick={() => {
            cartProducts.length === 0
              ? alert("You need to have products in cart to make an order.")
              : user
              ? postOrder()
              : routeChange();
          }}
        >
          Order
        </Button>
      </div>
    </>
  );
};

export default Cart;
