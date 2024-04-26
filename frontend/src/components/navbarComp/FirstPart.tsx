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
          <Button onClick={() => {}} className="categories">
            <a>Categories</a>
          </Button>
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
