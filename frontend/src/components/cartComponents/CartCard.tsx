import React, { useEffect, useState } from "react";
import { cartProduct } from "../../pages/cart/Cart";
import addProductCart from "../../pages/cart/hooks/addProductCart";
import Button from "../../components/Button";
import removeProductCart from "../../pages/cart/hooks/removeProductCart";

interface CartCard {
  product: cartProduct;
  index: number;
  removeProduct: (arg0: number) => void;
}

const CartCard = ({ product, index, removeProduct }: CartCard) => {
  const [productQuantity, setProductQuantity] = useState<number>(
    product.product_quantity
  );
  const [totalPrice, setTotalPrice] = useState<number>(product.total_price);

  useEffect(() => {
    setTotalPrice(productQuantity * product.product_price);
  }, [productQuantity]);

  return (
    <>
      <div className="cart-product" id={`${product.name}-${index}`}>
        <img src={product.product_img}></img>
        <p className="product-name-cart">{product.name}</p>
        <div className="right-elements">
          <p>{product.product_price}$</p>
          <p>
            {product.product_quantity > 0 ? (
              <Button
                className="minus1-cart"
                onClick={() => {
                  addProductCart(
                    product.id,
                    product.product_quantity - 1,
                    true
                  );
                  product.product_quantity--;
                  setProductQuantity(product.product_quantity);
                }}
              >
                -
              </Button>
            ) : (
              ""
            )}
            {product.product_quantity}
            <Button
              className="plus1-cart"
              onClick={() => {
                addProductCart(product.id, product.product_quantity + 1, true);
                product.product_quantity++;
                setProductQuantity(product.product_quantity);
              }}
            >
              +
            </Button>
          </p>
          <p>{totalPrice}$</p>

          <Button
            className="cart-remove-product"
            onClick={() => {
              removeProductCart(product.id);
              //update a view of cart
              removeProduct(product.id);
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartCard;
