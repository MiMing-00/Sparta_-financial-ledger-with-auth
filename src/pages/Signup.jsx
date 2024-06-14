import React, { useState } from "react";
import { Button, Container, InputGroup, LoginDiv, Section } from "./Login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/SignUpCss.css";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [idCheck, setIdCheck] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const onSubmitSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const signUpId = formData.get("signUpId");
    const signUpPW = formData.get("signUpPW");
    const signUpCheckPW = formData.get("signUpCheckPW");
    const signUpNickname = formData.get("signUpNickname");

    if (
      !signUpId.trim() ||
      !signUpPW.trim() ||
      !signUpCheckPW.trim() ||
      !signUpNickname.trim()
    ) {
      Swal.fire({
        title: "빈 칸을 모두 기입해주세요!",
        text: "내용을 확인하고 모두 입력해주세요.",
        icon: "warning",
      });
      return;
    }

    if (signUpId.length < 4 || signUpId.length > 10) {
      setIdCheck(false);
      return;
    }

    if (signUpPW !== signUpCheckPW) {
      setPasswordsMatch(false);
      return;
    }

    event.target.reset();
    setPasswordsMatch(true);

    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: signUpId,
          password: signUpPW,
          nickname: signUpNickname,
        }
      );
      const data = response.data;
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "회원가입에 실패하였습니다.",
          text: "다시 시도해주세요.",
        });
      }
    } catch (error) {
      console.log("Error =>", error);
    }
  };

  return (
    <Container>
      <Section>
        <LoginDiv>
          <span>이미 회원입니까?</span>
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
              required
            />
          </InputGroup>
          {!setIdCheck && (
            <div className="wrong-format">
              아이디는 네 글자 이상으로 해주세요.
            </div>
          )}
          <InputGroup>
            <label htmlFor="signUpPW">비밀번호</label>
            <input
              type="password"
              id="signUpPW"
              name="signUpPW"
              placeholder="비밀번호"
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="signUpCheckPW">비밀번호 확인</label>
            <input
              type="password"
              id="signUpCheckPW"
              name="signUpCheckPW"
              placeholder="비밀번호확인"
              required
            />
            {!passwordsMatch && (
              <div className="wrong-format">비밀번호가 다릅니다.</div>
            )}
          </InputGroup>
          <InputGroup>
            <label htmlFor="signUpNickname">닉네임</label>
            <input
              type="text"
              id="signUpNickname"
              name="signUpNickname"
              placeholder="닉네임"
              required
            />
          </InputGroup>
          <Button type="submit">회원가입</Button>
        </form>
      </Section>
    </Container>
  );
};

export default Signup;
