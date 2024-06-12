import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export const Container = styled.div`
  padding: 2rem;
`;

export const LogincSection = styled.section`
  max-width: 300px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;

  label {
    margin: 0.5rem 2px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  padding: 8px 20px;
  height: 34px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

export const LoginDiv = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    text-decoration: none;
    margin-bottom: 20px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get("loginId");
    const password = formData.get("loginPW");

    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );
      const data = response.data;
      if (data.success) {
        login(data.accessToken);
        navigate("/mypage");
        console.log(data);
        Swal.fire({
          icon: "success",
          title: `${data.nickname}님 환영합니다.`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "로그인에 실패하셨습니다.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "에러",
      });
    }
  };

  return (
    <Container>
      <LogincSection>
        <LoginDiv>
          <span>처음 방문하셨나요?</span>
          <span
            onClick={() => navigate("/signup")}
            style={{ fontWeight: 800, cursor: "pointer" }}
          >
            회원가입
          </span>
        </LoginDiv>
        <h3>로그인</h3>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="loginId">아이디</label>
            <input
              type="text"
              id="loginId"
              name="loginId"
              placeholder="아이디"
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="loginPW">비밀번호</label>
            <input
              type="password"
              id="loginPW"
              name="loginPW"
              placeholder="비밀번호"
            />
          </InputGroup>
          <Button type="submit">로그인</Button>
        </form>
      </LogincSection>
    </Container>
  );
};

export default Login;
