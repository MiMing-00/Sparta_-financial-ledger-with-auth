import React, { useState } from "react";
import {
  Button,
  Container,
  InputGroup,
  LoginDiv,
  LogincSection,
} from "./Login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/SignUpCss.css";

const Signup = () => {
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const onSubmitSignUp = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const signUpId = formData.get("signUpId");
    const signUpPW = formData.get("signUpPW");
    const signUpCheckPW = formData.get("signUpCheckPW");
    const signUpNickname = formData.get("signUpNickname");

    // 유효성 검사 추가
    if (!signUpId || !signUpPW || !signUpCheckPW || !signUpNickname) {
      Swal.fire({
        title: "빈 칸을 모두 기입해주세요!",
        text: "내용을 확인하고 모두 입력해주세요.",
        icon: "warning",
      });
      return;
    }

    //비밀번호 일치 확인
    if (signUpPW !== signUpCheckPW) {
      setPasswordsMatch(false);
      return;
    }

    event.target.reset();
    setPasswordsMatch(true);
    Swal.fire({
      icon: "success",
      title: "회원가입이 완료되었습니다.",
      text: `${signUpNickname}님 환영합니다.`,
    });
  };

  //비밀번호 확인

  return (
    <Container>
      <LogincSection>
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
        <form onSubmit={onSubmitSignUp}>
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
            {!passwordsMatch && (
              <div className="pw-inst-same">비밀번호가 다릅니다.</div>
            )}
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
      </LogincSection>
    </Container>
  );
};

export default Signup;
