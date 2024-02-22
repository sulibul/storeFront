import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Products from "./pages/products/Products.tsx";
import ProductDetail from "./pages/products/ProductDetail.tsx";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./pages/products/Layout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="products/:category?/:company?/:name?/:price_min?/:price_max?"
            element={<Products />}
            exact
          />
          <Route path="product/:productId" element={<ProductDetail />} exact />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
