import "./App.scss";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";

import ProductDetail from "./pages/products/ProductDetail.tsx";
import Products from "./pages/products/Products.tsx";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./pages/Layout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Login from "./pages/user/Login.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import UserInfo from "./pages/user/UserInfo.tsx";
import Register from "./pages/user/Register.tsx";
import Cart from "./pages/cart/Cart.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";

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
            <Route path="search/:query?" element={<Products />} exact />
            <Route
              exact
              path="product/:productId"
              element={<ProductDetail />}
            />

            <Route path="cart/" element={<Cart />} />

            <Route path="user/login/" element={<Login />} />

            <Route path="user/register" element={<Register />} />
            <Route path="contact/" element={<ContactPage />} />
            <Route path="aboutus/" element={<AboutUsPage />} />
            <Route
              path="user/info"
              element={
                <PrivateRoute>
                  <UserInfo />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
