import "../../assets/styles/Products.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import FilterSideBar from "../../components/FilterSideBar";
import Button from "../../components/Button";
import addProductCart from "../cart/hooks/addProductCart";

// interface Props {frontend/src/styles
//   name?: string;
//   company?: string;
//   category?: string;
//   price_min?: Number;
//   price_max?: Number;
// }

const Products = () => {
  const params = useParams();
  const navigate = useNavigate();

  const productQuery = document.querySelector("#products");

  let filteredData: string[] = [];
  const [data, setData] = useState<any[]>([]);
  const [checkedValue, setValue] = useState<string[]>([]);

  const fetchData = async () => {
    const result = await AJAX(
      !params.hasOwnProperty("query")
        ? `${API_URL}/products?name__icontains=${params.name ? params.name : ""}
          ${params.company ? `&company=${params.company}` : ""}${
            params.category ? `&category=${params.category}` : ""
          }&price_min=${params.price_min ? params.price_min : ""}&price_max=${
            params.price_max ? params.price_max : ""
          }`
        : `${API_URL}/products/search?query=${params.query}`
    );
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let companies = data
    .map((product) => {
      return product.company;
    })
    .filter((value, index, array) => array.indexOf(value) === index);

  const handleCallBack = (filters: string[]) => {};

  return (
    <>
      <div className="grid-container">
        <div className="sidebar-container">
          <FilterSideBar
            handleCallBack={handleCallBack}
            filters={companies}
            setValue={setValue}
            checkedValue={checkedValue}
          ></FilterSideBar>
        </div>
        <div className="product-container">
          {data ? (
            // check if any filters are active
            checkedValue.length == 0 ? (
              data.map((product) => {
                return (
                  <div className="product-card" id={`product${product.id}`}>
                    <img src={product.product_img}></img>
                    <div className="second-part">
                      <h1>{product.name}</h1>
                      <div className="product-card-buttons">
                        <Link to={`/product/${product.id}`}>
                          {product.price}$
                        </Link>
                        <Button
                          className="add-to-cart"
                          onClick={() => {
                            addProductCart(Number(product.id), 1);
                            navigate("/cart");
                          }}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              data
                .filter((product) => checkedValue.includes(product.company))
                .map((product) => (
                  <div className="product-card">
                    <img src={product.product_img}></img>
                    <div className="second-part">
                      <h1>{product.name}</h1>
                      <div className="product-card-buttons">
                        <Link to={`/product/${product.id}`}>
                          {product.price}$
                        </Link>
                        <Button
                          className="add-to-cart"
                          onClick={() => {
                            addProductCart(Number(product.id), 1);
                            navigate("/cart");
                          }}
                        >
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
            )
          ) : (
            <p>no products</p>
          )}
          {}
        </div>
      </div>
    </>
  );
};

export default Products;
