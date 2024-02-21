import React from "react";

interface Props {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CheckBox = ({ name, value, handleChange }: Props) => {
  return (
    <>
      <input
        type="checkbox"
        id="filter"
        value={value}
        name={name}
        onChange={(event) => handleChange(event)}
      ></input>
      <label>{name}</label>
    </>
  );
};

export default CheckBox;
