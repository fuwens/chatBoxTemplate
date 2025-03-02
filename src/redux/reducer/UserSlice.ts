/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-02 14:52:43
 * @Description: user slice。
 */
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  nick_name: string;
  username: string;
  phone: string;
  email: string;
}

// Define the initial state using that type
const initialState: UserState = {
  nick_name: "test",
  username: "test1",
  phone: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.nick_name = action.payload.nick_name;
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
    clearUserInfo: (state) => {
      state.nick_name = "";
      state.username = "";
      state.phone = "";
      state.email = "";
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export const { clearUserInfo } = userSlice.actions;

export const getUserInfoAsync = () => async (dispatch: any) => {
  const res = await fetch("/api/user");
  // console.log('res', res);
  if (!res) return;
  dispatch(setUserInfo(res));
};

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
