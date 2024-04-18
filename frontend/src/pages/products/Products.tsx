import "../../assets/styles/Products.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import FilterSideBar from "../../components/FilterSideBar";
import Button from "../../components/Button";
import addProductCart from "../cart/hooks/addProductCart";
import ProductContainer from "../../components/ProductContainer";

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
            filters={companies}
            setValue={setValue}
            checkedValue={checkedValue}
          ></FilterSideBar>
        </div>
        <div className="product-container">
          <div className="sort-control"></div>
          {data ? (
            // check if any filters are active
            checkedValue.length == 0 ? (
              data.map((product) => {
                return <ProductContainer product={product}></ProductContainer>;
              })
            ) : (
              data
                .filter((product) => checkedValue.includes(product.company))
                .map((product) => {
                  return (
                    <ProductContainer product={product}></ProductContainer>
                  );
                })
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
