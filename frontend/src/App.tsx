import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Carousel></Carousel>
    </>
  );
}

export default App;
