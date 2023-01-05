import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateComp = () => {
  let auth = localStorage.getItem("user");
  return <>{auth ? <Outlet /> : <Navigate to="/signup" />}</>;
};

export default PrivateComp;
