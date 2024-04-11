import { useContext } from "react";
import Button from "./Button";
import FirstPart from "./navbarComp/FirstPart";
import AuthContext from "../context/AuthContext";
import "../assets/styles/navbar/Navbar.scss";

const Navbar = () => {
  let { name } = useContext(AuthContext);
  return (
    <>
      <div className="navbar">
        <FirstPart></FirstPart>
      </div>
    </>
  );
};

export default Navbar;
