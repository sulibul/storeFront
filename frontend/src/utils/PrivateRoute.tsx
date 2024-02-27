import { ReactNode, useContext, PropsWithChildren, useEffect } from "react";
import { Route, redirect, Routes, useNavigate } from "react-router";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../context/AuthContext";

type ProtectedRouteProps = PropsWithChildren;

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/user/login", { replace: true });
    }
  }, [navigate, user]);

  return children;
};
export default PrivateRoute;
