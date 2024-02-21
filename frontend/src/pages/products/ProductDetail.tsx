import "./ProductDetail.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../hooks/getJson";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";

// Define interface for product details
interface Product {
  name: string;
  description: string;
  // Add more properties as needed
}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [data, setData] = useState<Product | null>(null);

  //API get product data
  const fetchData = async () => {
    const result = await AJAX(`${API_URL}/products/${productId}`);
    setData(result);
    console.log(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <div className="product product-container">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
        </div>
      ) : (
        <p>no products</p>
      )}
    </>
  );
};

export default ProductDetail;
