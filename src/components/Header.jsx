import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <HeaderSection>
      <HeaderWrap>
        <span onClick={() => navigate("/")} className="logo">
          LOGO
        </span>
        <div>
          <span onClick={() => navigate("/signup")} className="logo">
            SignUp
          </span>
          <span onClick={() => navigate("/login")} className="logo">
            Login
          </span>
        </div>
      </HeaderWrap>
    </HeaderSection>
  );
};

export default Header;
