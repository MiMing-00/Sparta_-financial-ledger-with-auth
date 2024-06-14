import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import MyPage from "../pages/MyPage";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/mypage" />;
};

const Router = () => (
  <Routes>
    <Route path="/signup" element={<PublicRoute element={Signup} />} />
    <Route path="/login" element={<PublicRoute element={Login} />} />
    <Route path="/mypage" element={<PrivateRoute element={MyPage} />} />
    <Route path="/" element={<Home />} />
    <Route path="/detail/:id" element={<Detail />} />
  </Routes>
);

export default Router;
