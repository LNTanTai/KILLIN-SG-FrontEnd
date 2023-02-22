import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {
  AdminPage,
  CartPage,
  HomePage,
  LoginPage,
  OwnerPage,
  ProductDetailPage,
  ShopPage,
  StaffPage,
} from "../services/constants/pageConstants";
import {
  ADMIN_PATH,
  CART_PATH,
  HOMEPAGE_PATH,
  LOGIN_PATH,
  OWNER_PATH,
  SHOP_PATH,
  STAFF_PATH,
  USER_PATH,
} from "../services/constants/pathConstants";
import jwtDecode from "jwt-decode";
import RequireAuth from "../services/auth/RequireAuth";
import ProductList from "../pages/ShopPage/components/ProductList";

export default function Routes() {
  let START_PATH = HOMEPAGE_PATH;
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  if (loginInfo !== null) {
    let token = jwtDecode(loginInfo);
    const roleId = token.role;
    switch (roleId) {
      case "1":
        START_PATH = OWNER_PATH;
        break;
      case "2":
        START_PATH = STAFF_PATH;
        break;
      case "3":
        START_PATH = USER_PATH;
        break;
      case "4":
        START_PATH = ADMIN_PATH;
        break;
      default:
        START_PATH = HOMEPAGE_PATH;
        break;
    }
  }
  return useRoutes([
    //Role User
    {
      path: "/user",
      element: <RequireAuth allowedRoles={["3"]} />,
      children: [
        {
          path: "homepage",
          element: <HomePage />,
        },
        {
          path: SHOP_PATH,
          element: <ShopPage />,
          children: [
            {
              path: "product-list/:id",
              element: <ProductList />,
            },
          ],
        },
        {
          element: <ProductDetailPage />,
          children: [
            {
              path: "product-detail/:id",
              element: <ProductDetailPage />,
            },
          ],
        },
        { path: CART_PATH, element: <CartPage /> },
      ],
    },

    //Role Admin
    {
      path: "/admin",
      element: <RequireAuth allowedRoles={["4"]} />,
      children: [
        {
          path: "homepage",
          element: <AdminPage />,
        },
      ],
    },

    //Role Staff
    {
      path: "/staff",
      element: <RequireAuth allowedRoles={["2"]} />,
      children: [
        {
          path: "homepage",
          element: <StaffPage />,
        },
      ],
    },

    //Role Owner
    {
      path: "/owner",
      element: <RequireAuth allowedRoles={["1"]} />,
      children: [
        {
          path: "homepage",
          element: <OwnerPage />,
        },
      ],
    },

    //Role Guest
    {
      path: "/",
      children: [
        {
          path: HOMEPAGE_PATH,
          element:
            START_PATH === HOMEPAGE_PATH ? (
              <HomePage />
            ) : (
              <Navigate to={START_PATH} />
            ),
        },
        {
          element:
            START_PATH === HOMEPAGE_PATH ? (
              <ProductDetailPage />
            ) : (
              <Navigate to={START_PATH} />
            ),
          children: [
            {
              path: "/product-detail/:id",
              element:
                START_PATH === HOMEPAGE_PATH ? (
                  <ProductDetailPage />
                ) : (
                  <Navigate to={START_PATH} />
                ),
            },
          ],
        },
        {
          path: SHOP_PATH,
          element:
            START_PATH === HOMEPAGE_PATH ? (
              <ShopPage />
            ) : (
              <Navigate to={START_PATH} />
            ),
          children: [
            {
              path: "product-list/:id",
              element:
                START_PATH === HOMEPAGE_PATH ? (
                  <ProductList />
                ) : (
                  <Navigate to={START_PATH} />
                ),
            },
          ],
        },
        {
          path: LOGIN_PATH,
          element:
            START_PATH === HOMEPAGE_PATH ? (
              <LoginPage />
            ) : (
              <Navigate to={START_PATH} />
            ),
        },
      ],
    },
  ]);
}
