import Button from "../Button";
import Search from "./Search";
import "./FirstPart.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const FirstPart = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <>
      <div className="first-part-nav">
        <div className="left-buttons">
          <Button onClick={() => {}} color="blue">
            <Link to="">Shops</Link>
          </Button>
          <Button onClick={() => {}} color="blue">
            <Link to="/products">Products</Link>
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
          {user ? (
            <Button onClick={logoutUser} color="blue">
              logout
              {/* <Link to="/logout">Logout</Link> */}
            </Button>
          ) : (
            <Button onClick={() => {}} color="blue">
              <a>Login/Register</a>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FirstPart;
