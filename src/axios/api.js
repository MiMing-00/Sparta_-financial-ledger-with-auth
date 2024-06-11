import axios from "axios";
import React from "react";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export default api;
