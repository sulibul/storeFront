import "./Products.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import FilterSideBar from "../../components/FilterSideBar";
// interface Props {
//   name?: string;
//   company?: string;
//   category?: string;
//   price_min?: Number;
//   price_max?: Number;
// }

const Products = () => {
  const params = useParams();

  let filteredData: string[] = [];
  const [data, setData] = useState<any[]>([]);
  const [checkedValue, setValue] = useState<string[]>([]);

  const fetchData = async () => {
    const result = await AJAX(
      `${API_URL}/products?name__icontains=${params.name ? params.name : ""}${
        params.company ? `&company=${params.company}` : ""
      }${params.category ? `&category=${params.category}` : ""}&price_min=${
        params.price_min ? params.price_min : ""
      }&price_max=${params.price_max ? params.price_max : ""}`
    );
    setData(result);
  };
  const fetchData2 = async () => {
    const result = await AJAX(
      `${API_URL}/products?name__icontains=${params.name ? params.name : ""}${
        params.company ? `&company=${params.company}` : ""
      }${params.category ? `&category=${params.category}` : ""}&price_min=${
        params.price_min ? params.price_min : ""
      }&price_max=${params.price_max ? params.price_max : ""}`
    );
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {});

  let companies = data
    .map((product) => {
      console.log(product);
      return product.company;
    })
    .filter((value, index, array) => array.indexOf(value) === index);
  const handleCallBack = (filters: string[]) => {
    console.log(filters);
  };

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
            checkedValue.length == 0 ? (
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
              data
                .filter((product) => checkedValue.includes(product.company))
                .map((product) => (
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
            )
          ) : (
            <p>no products</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
