import "./Products.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../hooks/getJson";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";

// interface Props {
//   name?: string;
//   company?: string;
//   category?: string;
//   price_min?: Number;
//   price_max?: Number;
// }

const Products = () => {
  const params = useParams();

  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const result = await AJAX(
      `${API_URL}/products?name__icontains=${
        params.name ? params.name : ""
      }&company=${params.company ? params.company : ""}&category=${
        params.category ? params.category : ""
      }&price_min=${params.price_min ? params.price_min : ""}&price_max=${
        params.price_max ? params.price_max : ""
      }`
    );
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <div className="grid-container">
        <div className="sidebar-container">
          <div>
            {data
              ? data.map((product) => (
                  <div>
                    <Link to={`/products//${product.company}}`}>
                      {product.company}
                    </Link>
                  </div>
                ))
              : ""}
          </div>
          <div>
            {data
              ? data.map((product) => (
                  <div>
                    <></>
                    <Link to={`/products/${product.category}`}>
                      {product.category}
                    </Link>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className="product-container">
          {data ? (
            data.map((product) => (
              <div
                className="product"
                style={{
                  backgroundImage: `url(${product.product_img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <Link to={`/product/${product.id}`}>link to product</Link>
              </div>
            ))
          ) : (
            <p>no products</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
