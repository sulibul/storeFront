import React, { useState } from "react";
import CheckBox from "./CheckBox";

type CustomFunction = (value: string[]) => string[];

interface Props {
  filters: string[];
  checkedValue: string[];
  setValue: (arg0: CustomFunction) => void;
}

const FilterSideBar = ({ filters, checkedValue, setValue }: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    console.log(value);
    console.log(checked);
    if (checked) {
      setValue((prevCheckedValues) => [...prevCheckedValues, value]);
    } else {
      setValue((prevCheckedValues) => {
        return [
          ...prevCheckedValues.filter((filter: string) => filter != value),
        ];
      });
    }
  }

  return (
    <>
      <form>
        {filters.map((company: string) => (
          <CheckBox
            name={company}
            value={company}
            handleChange={handleChange}
          ></CheckBox>
        ))}
      </form>
    </>
  );
};

export default FilterSideBar;
