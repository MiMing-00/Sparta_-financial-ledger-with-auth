import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const HeaderSection = styled.section`
  width: 100%;
  max-width: 1280px;
  height: auto;
  background-color: darkgray;
  color: white;
  padding: 1rem 0px;
  display: flex;
  flex-direction: row;
  margin: 1rem auto 0 0;
  border: none;
  border-radius: 15px 15px 0 0;

  span {
    margin: 0px 1rem;
    &:hover {
      font-weight: bold;
    }
  }
`;

const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "정말로 로그아웃 하시겠습니까?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfiremd) {
        logout();
        navigate("/");
      }
    });
  };

  const handleMyPage = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/mypage");
    }
  };

  return (
    <HeaderSection>
      <HeaderWrap>
        <span onClick={() => navigate("/")} className="logo">
          LOGO
        </span>
        {isAuthenticated ? (
          <div>
            <span onClick={handleLogout} className="logo">
              Logout
            </span>
            <span onClick={handleMyPage} className="logo">
              MyPage
            </span>
          </div>
        ) : (
          <div>
            <Link to="/login" className="logo">
              Login
            </Link>
            <Link to="/signup" className="logo">
              Signup
            </Link>
          </div>
        )}
      </HeaderWrap>
    </HeaderSection>
  );
};

export default Header;
