import styled from "styled-components";
import { useState, useContext } from "react";
import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";
import CreateExpense from "../components/CreateExpense";
import { useSelector } from "react-redux";
import jsonApi from "../axios/api";
import { useQuery } from "@tanstack/react-query";

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

export default function Home() {
  const [month, setMonth] = useState(1);
  // const expenses = useSelector((state) => state.expenses);

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

  const filteredExpenses = data.filter((expense) => expense.month === month);

  return (
    <Container>
      <MonthNavigation month={month} setMonth={setMonth} />
      <CreateExpense month={month} />
      <ExpenseList expenses={filteredExpenses} />
    </Container>
  );
}
