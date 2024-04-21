import React, { useState } from "react";
import CheckBox from "./CheckBox";

type CustomFunction = (value: string[]) => string[];

interface Props {
  companies: string[];
  categories: string[];
  filters: string[];
  setFilters: (arg0: CustomFunction) => void;
}

const FilterSideBar = ({
  companies,
  categories,
  filters,
  setFilters,
}: Props) => {
  function handleChangeCompany(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    console.log(value);
    console.log(checked);
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        companies: [...prevFilters.companies, value],
      }));
    } else {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          companies: [
            ...prevFilters.companies.filter(
              (filter: string) => filter != value
            ),
          ],
        };
      });
    }
  }
  function handleChangeCategory(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    console.log(value);
    console.log(checked);
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: [...prevFilters.categories, value],
      }));
    } else {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          categories: [
            ...prevFilters.categories.filter(
              (filter: string) => filter != value
            ),
          ],
        };
      });
    }
  }

  return (
    <>
      <form>
        <h3>Companies</h3>
        {companies.map((company: string) => (
          <CheckBox
            name={company}
            value={company}
            handleChange={handleChangeCompany}
          ></CheckBox>
        ))}
        <h3>Categories</h3>
        {categories.map((category: string) => (
          <CheckBox
            name={category}
            value={category}
            handleChange={handleChangeCategory}
          ></CheckBox>
        ))}
      </form>
    </>
  );
};

export default FilterSideBar;
