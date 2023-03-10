import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {
  AdminPage,
  BannerPage,
  BillHistory,
  CartPage,
  CategoryPage,
  CheckOutPage,
  HomePage,
  LoginPage,
  OwnerPage,
  PaymentPage,
  ProductDetailPage,
  ProfilePage,
  ShopPage,
  SignUpPage,
  StaffPage,
} from "../services/constants/pageConstants";
import {
  ADMIN_PATH,
  BILL_PATH,
  CART_PATH,
  CHECKOUT_PATH,
  HOMEPAGE_PATH,
  LOGIN_PATH,
  OWNER_PATH,
  PAYMENT_PATH,
  PROFILE_PATH,
  SEARCH_PATH,
  SHOP_PATH,
  SIGN_UP_PATH,
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
        { path: PAYMENT_PATH, element: <PaymentPage /> },
        { path: CHECKOUT_PATH, element: <CheckOutPage /> },
        { path: PROFILE_PATH, element: <ProfilePage /> },
        { path: BILL_PATH, element: <BillHistory /> }
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
        { path: PROFILE_PATH, element: <ProfilePage /> },
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
        { path: PROFILE_PATH, element: <ProfilePage /> },
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
        {
          path: "banner",
          element: <BannerPage />,
        },
        {
          path: "category",
          element: <CategoryPage />,
        },
        { path: PROFILE_PATH, element: <ProfilePage /> },
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
        {
          path: SIGN_UP_PATH,
          element:
            START_PATH === HOMEPAGE_PATH ? (
              <SignUpPage />
            ) : (
              <Navigate to={START_PATH} />
            ),
        },
      ],
    },
  ]);
}
