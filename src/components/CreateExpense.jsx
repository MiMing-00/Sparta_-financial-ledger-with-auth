import { Section } from "../pages/Home";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { postExpenses } from "../axios/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../main";

const InputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
`;

const InputGroupInline = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 120px;
  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const AddButton = styled.button`
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

export default function CreateExpense({ month }) {
  const [newDate, setNewDate] = useState(
    `2024-${String(month).padStart(2, "0")}-01`
  );
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postExpenses,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "지출이 작성 완료되었습니다.",
        text: "직접 확인해보세요!",
      }).then(() => {
        queryClient.invalidateQueries(["expensesData"]);
        navigate(0);
      });
    },
  });

  const handleAddExpense = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "info",
        title: "로그인 후 이용해주세요.",
      });
      return;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(newDate)) {
      Swal.fire({
        icon: "info",
        title: "날짜를 YYYY-MM-DD 형식으로 입력해주세요.",
      });
      return;
    }

    const parsedAmount = parseInt(newAmount, 10);
    if (!newItem || parsedAmount <= 0) {
      Swal.fire({
        icon: "info",
        title: "유효한 항목과 금액을 입력해주세요.",
      });
      return;
    }

    const newExpense = {
      userId: user.id,
      nickname: user.nickname,
      month: parseInt(newDate.split("-")[1], 10),
      date: newDate,
      item: newItem,
      amount: parsedAmount,
      description: newDescription,
    };

    mutation.mutate(newExpense);

    setNewDate(`2024-${String(month).padStart(2, "0")}-01`);
    setNewItem("");
    setNewAmount("");
    setNewDescription("");
  };

  return (
    <Section>
      <InputRow>
        <InputGroupInline>
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="item">항목</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="지출 항목"
          />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="amount">금액</label>
          <input
            type="number"
            id="amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="지출 금액"
          />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="description">내용</label>
          <input
            type="text"
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="지출 내용"
          />
        </InputGroupInline>
        <AddButton onClick={handleAddExpense}>저장</AddButton>
      </InputRow>
    </Section>
  );
}
