import React from "react";
import "../assets/styles/Footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-column">
          <h3>Informations</h3>
          <ul className="footer-categories">
            <li>Contact</li>
            <li>About us</li>
            <li>Deliveries</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Categories</h3>
          <ul className="footer-categories">
            <li>Laptops</li>
            <li>Smartphones</li>
            <li>Monitors</li>
            <li>Accessories</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>User</h3>
          <ul className="footer-categories">
            <li>User info</li>
            <li>Cart</li>
            <li>Orders</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
