import React from "react";
import "../assets/styles/Order.scss";

interface OrderProps {
  productImg: string;
  productBrand: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

const Order = ({
  productImg,
  productBrand,
  productPrice,
  productName,
  quantity,
}: OrderProps) => {
  return (
    <div className="order-container">
      <img src={productImg} alt="product" />
      <p id="product-brand">{productBrand}</p>
      <p id="product-name">{productName}</p>
      <p id="product-price">{productPrice}$</p>
      <p id="product-quantity">Quantity: {quantity}</p>
    </div>
  );
};

export default Order;
