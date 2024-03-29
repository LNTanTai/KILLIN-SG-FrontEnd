import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { HOMEPAGE_PATH, LOGIN_PATH } from "../constants/pathConstants";

const RequireAuth = ({ allowedRoles }) => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  let user;
  let roleID = "0";
  if (loginInfo !== null) {
    user = jwtDecode(loginInfo);
    roleID = user.role;
  }
  const location = useLocation();

  // console.log(location);
  return allowedRoles?.includes(roleID) ? (
    <Outlet />
  ) : (
    <Navigate to={HOMEPAGE_PATH} replace state={{ from: location }}  />
  );
};

export default RequireAuth;
