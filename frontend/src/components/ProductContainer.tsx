import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import "../assets/styles/ProductContainer.scss";

interface ProductProps {
  product: Product; // Assuming Product is the correct type
}

type Product = {
  id: number;
  company: string;
  category: string;
  company_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  product_img: string;
};
const ProductContainer = ({ product }: ProductProps) => {
  return (
    <>
      <div className="product-card" id={`product${product.id}`}>
        <img src={product.product_img}></img>
        <h3 className="product-name">{product.name}</h3>
        <Link to={`/product/${product.id}`} className="product-price">
          {product.price}$
        </Link>
      </div>
    </>
  );
};

export default ProductContainer;
