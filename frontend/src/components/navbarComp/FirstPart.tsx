import React from "react";
import Button from "../Button";
import Search from "./Search";
import "./FirstPart.scss";

const FirstPart = () => {
  return (
    <>
      <div className="first-part-nav">
        <div className="left-buttons">
          <Button onClick={() => {}} color="blue">
            <a>Shops</a>
          </Button>
          <Button onClick={() => {}} color="blue">
            <a>Products</a>
          </Button>
          <Button onClick={() => {}} color="blue">
            <a>Contact</a>
          </Button>
        </div>
        <Search></Search>
        <div className="right-buttons">
          <Button onClick={() => {}} color="blue">
            <a>Cart</a>
          </Button>
          <Button onClick={() => {}} color="blue">
            <a>Login/Register</a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default FirstPart;
