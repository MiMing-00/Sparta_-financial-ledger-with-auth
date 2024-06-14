import { createSlice } from "@reduxjs/toolkit";

const INITIAL_USER = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        ...state.user,
        nickname: action.payload.nickname,
        avatar: action.payload.avatar || state.user.avatar,
      };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
