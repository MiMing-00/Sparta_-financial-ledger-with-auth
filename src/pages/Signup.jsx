import React from "react";
import { Button, Container, InputGroup, LoginDiv } from "./Login";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LoginDiv>
        <span>이미 회원이세요?</span>
        <span
          onClick={() => navigate("/login")}
          style={{ fontWeight: 800, cursor: "pointer" }}
        >
          로그인
        </span>
      </LoginDiv>
      <h3>회원가입</h3>
      <form>
        <InputGroup>
          <label htmlFor="signUpId">아이디</label>
          <input
            type="text"
            id="signUpId"
            name="signUpId"
            placeholder="아이디"
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="signUpPW">비밀번호</label>
          <input
            type="password"
            id="signUpPW"
            name="signUpPW"
            placeholder="비밀번호"
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="signUpCheckPW">비밀번호 확인</label>
          <input
            type="password"
            id="signUpCheckPW"
            name="signUpCheckPW"
            placeholder="비밀번호확인"
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="signUpNickname">닉네임</label>
          <input
            type="text"
            id="signUpNickname"
            name="signUpNickname"
            placeholder="닉네임"
          />
        </InputGroup>
        <Button type="submit">회원가입</Button>
      </form>
    </Container>
  );
};

export default Signup;
