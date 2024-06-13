import { createSlice } from "@reduxjs/toolkit";

const INITIAL_USER = {
  user: {},
  //   { avatar: null, id: "plmk111", nickname: "56789", success: false },
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER,
  reducers: {
    changeProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { changeProfile } = userSlice.actions;
export default userSlice.reducer;
