import "../../assets/styles/Products.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import FilterSideBar from "../../components/FilterSideBar";
import ProductContainer from "../../components/ProductContainer";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";

type Filters = {
  companies: string[];
  categories: string[];
  priceMin: number;
  priceMax: number;
};

const Products = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setproductsPerPage] = useState(5);
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({
    companies: [],
    categories: [],
    priceMin: 0,
    priceMax: 0,
  });
  const [filteredData, setFilteredData] = useState<any[]>([]);
  //set companies and categories for filter sidebar
  const companies = [...new Set(data.map((product) => product.company))];
  const categories = [...new Set(data.map((product) => product.category))];
  const indexOfLastproduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastproduct - productsPerPage;

  const fetchData = async () => {
    //check if query is present in params
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
  }, [data]);

  // filter data based on filters
  const filterData = () => {
    if (
      filters.companies.length === 0 &&
      filters.categories.length === 0 &&
      !filters.priceMin &&
      !filters.priceMax
    ) {
      setFilteredData([]);
      return;
    }
    let filteredProducts = data;
    if (filters.companies.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.companies.includes(product.company)
      );
    }
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.priceMin && filters.priceMax) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filters.priceMin && product.price <= filters.priceMax
      );
    }

    if (filteredProducts.length === 0) {
      alert("No products found");
      setFilteredData([]);
      return;
    }
    setFilteredData(filteredProducts);
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="grid-container">
        <div className="sidebar-container">
          <FilterSideBar
            companies={companies}
            categories={categories}
            setFilters={setFilters}
            checkedValue={filters}
          ></FilterSideBar>
          <div className="price-filters">
            <h3>Price</h3>
            <div className="price-filter">
              <label htmlFor="min-price">Min</label>
              <input
                id="min-price"
                type="number"
                onChange={(e) =>
                  setFilters({ ...filters, priceMin: parseInt(e.target.value) })
                }
                value={filters.priceMin || ""}
              ></input>
            </div>
            <div className="price-filter">
              <label htmlFor="max-price">Max</label>
              <input
                id="max-price"
                type="number"
                onChange={(e) =>
                  setFilters({ ...filters, priceMax: parseInt(e.target.value) })
                }
                value={filters.priceMax || ""}
              ></input>
            </div>
          </div>
          <Button className="submit-button" onClick={() => filterData()}>
            Submit
          </Button>
        </div>
        <div className="product-container">
          <div className="sort-control"></div>
          {/* check if any filters are applied */}
          {filteredData.length == 0
            ? data
                .slice(indexOfFirstProduct, indexOfLastproduct)
                .map((product) => {
                  return (
                    <ProductContainer product={product}></ProductContainer>
                  );
                })
            : filteredData
                .slice(indexOfFirstProduct, indexOfLastproduct)
                .map((product) => {
                  return (
                    <ProductContainer product={product}></ProductContainer>
                  );
                })}
          <Pagination
            length={filteredData.length > 0 ? filteredData.length : data.length}
            productsPerPage={productsPerPage}
            handlePagination={handlePagination}
            currentPage={currentPage}
          ></Pagination>
        </div>
      </div>
    </>
  );
};

export default Products;
