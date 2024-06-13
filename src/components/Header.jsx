import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../redux/slices/userSlice";
import axios from "axios";
import MetamongDefaultImg from "../img/defaultIMG.png";

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderImg = styled.img`
  max-width: 30px;
  max-height: 30px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const handleLogout = () => {
    Swal.fire({
      title: "정말로 로그아웃 하시겠습니까?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
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

  //유저 정보 담아서
  //useEffect 마운트될 때  헤더에 정보 두 개 담고
  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const { data } = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(changeProfile(data));
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserInfo();
  }, []);

  return (
    <HeaderSection>
      <HeaderWrap>
        <div>
          <span onClick={() => navigate("/")} className="logo">
            HOME
          </span>
        </div>
        <div>
          {isAuthenticated && (
            <span>
              <HeaderImg
                onClick={() => navigate("/mypage")}
                src={user.avatar || MetamongDefaultImg}
              />
            </span>
          )}
        </div>
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
