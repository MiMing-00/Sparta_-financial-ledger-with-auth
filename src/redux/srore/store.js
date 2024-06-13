import { configureStore } from "@reduxjs/toolkit";
// import expensesReducer from "../slices/expensesSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    // expenses: expensesReducer,
    user: userReducer,
  },
});

export default store;
