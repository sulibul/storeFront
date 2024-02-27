import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";

import ProductDetail from "./pages/products/ProductDetail.tsx";
import Products from "./pages/products/Products.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./pages/products/Layout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Login from "./pages/user/Login.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import UserInfo from "./pages/user/UserInfo.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route
              path="products/:category?/:company?/:name?/:price_min?/:price_max?"
              element={<Products />}
              exact
            />

            <Route
              exact
              path="product/:productId"
              element={<ProductDetail />}
            />

            <Route path="user/login/" element={<Login />} />

            <Route
              path="user/info"
              element={
                <PrivateRoute>
                  <UserInfo />
                </PrivateRoute>
              }
            />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
