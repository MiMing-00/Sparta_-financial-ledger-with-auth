import axios from "axios";
import React from "react";

const jsonApi = axios.create({
  baseURL: "https://elderly-quasar-soul.glitch.me",
});

export const getExpenses = async () => {
  const { data } = await jsonApi.get("/expensesData");
  return data;
};

export const postExpenses = async (newExpense) => {
  const { data } = await jsonApi.post("/expensesData", newExpense);
  return data;
};

export const editExpenses = async (updateExpense) => {
  const { id, userId, nickname, ...rest } = updateExpense;
  const { data } = await jsonApi.put(`/expensesData/${id}`, updateExpense);
  return data;
};

export const deleteExpenses = async (id) => {
  try {
    const { data } = await jsonApi.delete(`/expensesData/${id}`);
    return data;
  } catch (error) {
    console.error("deleteExpenses API 요청 오류:", error);
  }
};

jsonApi.interceptors.request.use((config) => {
  return config;
});

jsonApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("응답 못 받음");
    return Promise.reject(error);
  }
);

export default jsonApi;
