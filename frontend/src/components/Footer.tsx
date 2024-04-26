import "../assets/styles/Footer.scss";
import { Link } from "react-router-dom";

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
            <li>
              <Link to="/products/1">Laptops</Link>
            </li>
            <li>
              <Link to="/products/3">Smartphones</Link>
            </li>
            <li>
              <Link to="/products/2">Monitors</Link>
            </li>
            <li>
              <Link to="/products/4">Accessories</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>User</h3>
          <ul className="footer-categories">
            <li>User info</li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>Orders</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
