import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "로그인 후에 이용해주세요.",
        text: "로그인 페이지로 이동합니다.",
      });
      navigate("/login");
    } else {
    }
  }, [isAuthenticated]);

  return <div>MyPage</div>;
};

export default MyPage;
