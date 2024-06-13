import { createSlice } from "@reduxjs/toolkit";

const INITIAL_USER = {
  // users: [],
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER,
  reducers: {
    // addUser: (state, action) => {
    //   state.users.push(action.payload);
    // },
    changeProfile: (state, action) => {
      // const { id, nickname, avatar } = action.payload;
      // const updateUser = state.users.find((user) => user.id === id);
      // if (updateUser) {
      //   updateUser.nickname = nickname;
      //   updateUser.avatar = avatar;
      // }
      state.user = action.payload;
    },
  },
});

export const { changeProfile, addUser } = userSlice.actions;
export default userSlice.reducer;
