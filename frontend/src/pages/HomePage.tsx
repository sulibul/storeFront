import { useEffect, useState } from "react";
import "../assets/styles/HomePage.scss";
import { API_URL } from "../config";
import { AJAX } from "../utils/getJson";
import ProductContainer from "../components/ProductContainer";

const HomePage = () => {
  const [bestProducts, setBestProducts] = useState<any[]>([]);

  const fetchProductData = async () => {
    const result = await AJAX(`${API_URL}/products
    `);
    setBestProducts(result.slice(0, 10));
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <div className="advertisment"></div>
      <div className="margin"></div>
      <div className="best-products-container">
        {bestProducts.map((product) => (
          <ProductContainer product={product} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
