import { useContext } from "react";
import Button from "./Button";
import FirstPart from "./navbarComp/FirstPart";
import SecondPart from "./navbarComp/SecondPart";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  let { name } = useContext(AuthContext);
  return (
    <>
      <FirstPart></FirstPart>
      <SecondPart></SecondPart>
    </>
  );
};

export default Navbar;
