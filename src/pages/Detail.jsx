import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import jsonApi, { deleteExpenses, editExpenses } from "../axios/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { queryClient } from "../main";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.$danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.$danger ? "#cc0000" : "#0056b3")};
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const getExpenses = async () => {
    const { data } = await jsonApi.get("/expensesData");
    return data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["expensesData"],
    queryFn: getExpenses,
  });

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error!</div>;
  }

  const selectedExpense = data.find((element) => element.id === id);
  const [date, setDate] = useState(selectedExpense.date);
  const [item, setItem] = useState(selectedExpense.item);
  const [amount, setAmount] = useState(selectedExpense.amount);
  const [description, setDescription] = useState(selectedExpense.description);

  const mutationupdate = useMutation({
    mutationFn: editExpenses,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "수정이 완료되었습니다.",
        text: "직접 확인해보세요!",
      }).then(() => {
        queryClient.invalidateQueries(["expensesData"]);
        navigate("/");
      });
    },
  });

  const mutationremove = useMutation({
    mutationFn: deleteExpenses,
    onSuccess: () => {
      Swal.fire({
        title: "정말로 삭제 하시겠습니까?",
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries(["expensesData"]);
          navigate("/");
        }
      });
    },
  });

  const theUser = data.filter((item) => item.userId === user.id);
  const thePost = theUser.filter((item) => item.id === id);

  const handleEdit = async (id) => {
    const theUser = data.filter((item) => item.userId === user.id);
    const thePost = theUser.filter((item) => item.id === id);

    if (thePost && thePost.length > 0 && thePost[0].id === id) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(date)) {
        alert("날짜를 YYYY-MM-DD 형식으로 입력해주세요.");
        return;
      }
      if (!item || amount <= 0) {
        alert("유효한 항목과 금액을 입력해주세요.");
        return;
      }

      const updateExpense = {
        id,
        date,
        item,
        amount,
        description,
        userId: user.id,
        nickname: user.nickname,
        month: parseInt(date.split("-")[1], 10),
      };

      mutationupdate.mutate(updateExpense);
    } else {
      Swal.fire({
        icon: "info",
        title: "작성자만 수정할 수 있습니다.",
      });
      return;
    }
  };

  const handleDelete = () => {
    const theUser = data.filter((item) => item.userId === user.id);
    const thePost = theUser.filter((item) => item.id === id);

    if (thePost && thePost.length > 0 && thePost[0].id === id) {
      try {
        mutationremove.mutate(id);
      } catch (error) {
        console.error("handleDelete 함수 오류:", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "작성자만 삭제할 수 있습니다.",
      });
      return;
    }
  };

  return (
    <Container>
      <InputGroup>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="지출 항목"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="지출 금액"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="지출 내용"
        />
      </InputGroup>
      {thePost && thePost.length > 0 && thePost[0].id === id ? (
        <ButtonGroup>
          <Button type="button" onClick={() => handleEdit(id)}>
            수정
          </Button>
          <Button type="button" $danger="true" onClick={() => handleDelete(id)}>
            삭제
          </Button>
          <BackButton type="button" onClick={() => navigate(-1)}>
            뒤로 가기
          </BackButton>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <BackButton type="button" onClick={() => navigate(-1)}>
            뒤로 가기
          </BackButton>
        </ButtonGroup>
      )}
    </Container>
  );
}
