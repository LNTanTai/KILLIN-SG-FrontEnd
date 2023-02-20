import React from "react";
import { useRoutes } from "react-router-dom";
import {
  CartPage,
  HomePage,
  LoginPage,
  ProductDetailPage,
} from "../services/constants/pageConstants";
import {
  CART_PATH,
  HOMEPAGE_PATH,
  LOGIN_PATH,
  PRODUCT_DETAIL_PATH,
} from "../services/constants/pathConstants";
import ProductList from "../pages/HomePage/components/ProductList";

export default function Routes() {
  return useRoutes([
    {
      path: HOMEPAGE_PATH,
      element: <HomePage />,
      children: [
        {
          path: "product-list/:id",
          element: <ProductList />,
        },
      ],
    },
    {
      path: PRODUCT_DETAIL_PATH,
      element: <ProductDetailPage />,
      children: [
        {
          path: "/product-detail/:id",
          element: <ProductDetailPage />,
        },
      ],
    },
    { path: CART_PATH, element: <CartPage /> },
    { path: LOGIN_PATH, element: <LoginPage /> },
  ]);
}
