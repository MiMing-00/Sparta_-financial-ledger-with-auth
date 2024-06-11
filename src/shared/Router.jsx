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

// PublicRoute : 로그인이 필요없는 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있는 사용자는 mypage로 리다이렉트
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
