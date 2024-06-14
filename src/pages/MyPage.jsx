import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Button, Container, InputGroup, Section } from "./Login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MetamongDefaultImg from "../img/defaultIMG.png";
import "../styles/MyPageCss.css";
import { setUser } from "../redux/slices/userSlice";

const MyPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "로그인 후에 이용해주세요.",
        text: "로그인 페이지로 이동합니다.",
      });
      navigate("/login");
    } else {
      dispatch(setUser(user));
    }
  }, [isAuthenticated, dispatch]);

  const changeUserProfile = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nickname = formData.get("nickname");
    const avatar = formData.get("avatar");

    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser(data));
      Swal.fire({
        icon: "success",
        title: "프로필이 업데이트 되었습니다.",
      });
    } catch (error) {
      console.log("프로필 업뎃 Error =>", error);
    }
  };

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <Section>
        {!user.avatar ? (
          <img className="profile-img" src={MetamongDefaultImg} alt="이미지" />
        ) : (
          <img className="profile-img" src={user.avatar} alt="프로필 사진" />
        )}
        <div>{user.id}</div>
        <div>{user.nickname} 님</div>
        <form onSubmit={changeUserProfile}>
          <InputGroup>
            <label htmlFor="nickname">닉네임 변경</label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              defaultValue={user.nickname}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="avatar">프로필 사진 변경</label>
            <input type="file" name="avatar" id="avatar" />
          </InputGroup>
          <Button type="submit">저장하기</Button>
        </form>
      </Section>
    </Container>
  );
};

export default MyPage;
