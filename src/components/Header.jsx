import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderSection = styled.section`
  width: 90%;
  max-width: 1280px;
  height: auto;
  background-color: darkgray;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  margin: 0 auto;

  span {
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
  return (
    <HeaderSection>
      <HeaderWrap>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          LOGO
        </div>
        <div>
          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            회원가입
          </span>
          <span> | </span>
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            로그인
          </span>
        </div>
      </HeaderWrap>
    </HeaderSection>
  );
};

export default Header;
