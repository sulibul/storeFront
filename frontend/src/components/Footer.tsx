import "../assets/styles/Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-column">
          <h3>Informations</h3>
          <ul className="footer-categories">
            <li>
              <Link
                to="/contact"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                onClick={() => (window.location.href = "/aboutus")}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Categories</h3>
          <ul className="footer-categories">
            <li>
              <Link
                to="/products/1"
                onClick={() => (window.location.href = "/products/1")}
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                to="/products/3"
                onClick={() => (window.location.href = "/products/3")}
              >
                Smartphones
              </Link>
            </li>
            <li>
              <Link
                to="/products/2"
                onClick={() => (window.location.href = "/products/2")}
              >
                Monitors
              </Link>
            </li>
            <li>
              <Link
                to="/products/4"
                onClick={() => (window.location.href = "/products/4")}
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>User</h3>
          <ul className="footer-categories">
            <li>
              <Link to="/cart" onClick={() => (window.location.href = "/cart")}>
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/user/orders"
                onClick={() => (window.location.href = "/user/orders")}
              >
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
