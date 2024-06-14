import axios from "axios";
import React from "react";

const jsonApi = axios.create({
  baseURL: "https://elderly-quasar-soul.glitch.me",
});

export const getExpenses = async () => {
  const { data } = await jsonApi.get(
    "/expensesData?_sort=createdAt&_order=desc"
  );
  return data;
};

export const postExpenses = async (newExpense) => {
  const { data } = await jsonApi.post("/expensesData", newExpense);
  return data;
};

export const editExpenses = async (updateExpense) => {
  const { id, userId, nickname, createdAt, ...rest } = updateExpense;
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

jsonApi.interceptors.request.use(
  async (config) => {
    const { data } = await authApi.get("/user");
    if (data.success) return config;
    return Promise.reject(new Error("사용자 정보 조회에 실패 했습니다."));
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
