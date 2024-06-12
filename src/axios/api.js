import axios from "axios";
import React from "react";

const jsonApi = axios.create({
  baseURL: "http://localhost:4000",
});

jsonApi.interceptors.request.use((config) => {
  console.log("인터셉트 요청 성공");
  return config;
});

jsonApi.interceptors.response.use(
  (response) => {
    console.log("응답 받음");
    return response;
  },
  (error) => {
    console.log("응답 못 받음");
    return Promise.reject(error);
  }
);

export default jsonApi;
