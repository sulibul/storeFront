import Button from "../Button";
import Search from "./Search";
import "../../assets/styles/navbar/FirstPart.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const FirstPart = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <>
      <div className="first-part-nav">
        <div className="left-buttons">
          <Button onClick={() => {}} className="home">
            <Link to="">BEST SHOP</Link>
          </Button>
        </div>
        <Search></Search>
        <div className="right-buttons">
          <Button onClick={() => {}} className="products">
            <Link to="/products">Products</Link>
          </Button>
          <div className="categories-dropdown">
            <Button onClick={() => {}} className="categories">
              <a className="categories">Categories</a>
            </Button>
            <div className="categories-dropdown-content">
              <p>
                <Link onClick={() => (window.location.href = "/products/1")}>
                  Laptops
                </Link>
              </p>
              <p>
                <Link onClick={() => (window.location.href = "/products/2")}>
                  Smartphones
                </Link>
              </p>
              <p>
                <Link onClick={() => (window.location.href = "/products/5")}>
                  Monitors
                </Link>
              </p>
              <p>
                <Link onClick={() => (window.location.href = "/products/3")}>
                  Accessories
                </Link>
              </p>
            </div>
          </div>
          {user ? (
            <Button onClick={logoutUser} className="logout">
              logout
              <Link to="/logout">Logout</Link>
            </Button>
          ) : (
            <Button onClick={() => {}} className="login">
              <Link to="user/login/">Login</Link>
            </Button>
          )}
          <Button onClick={() => {}} className="cart">
            <Link to="/cart">Cart</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default FirstPart;
