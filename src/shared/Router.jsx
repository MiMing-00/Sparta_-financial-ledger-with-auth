import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import MyPage from "../pages/MyPage";

const Router = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/" element={<Home />} />
    <Route path="/detail/:id" element={<Detail />} />
  </Routes>
);

export default Router;
