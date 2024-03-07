import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Products from "./pages/products/Products.tsx";
import ProductDetail from "./pages/products/ProductDetail/ProductDetail.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import "./index.scss";

import { BrowserRouter } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <NotFoundPage></NotFoundPage>,
//     children: [],
//   },
//   {
//     path: ,
//     element: <Products />,
//   },
//   {
//     path: "/products/:productId",
//     element: <ProductDetail></ProductDetail>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
