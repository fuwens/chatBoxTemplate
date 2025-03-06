/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-05 16:33:39
 * @Description: Chat相关的slice。
 */
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ChatState {
  isNewChatFlag: boolean;
}

// Define the initial state using that type
const initialState: ChatState = {
  isNewChatFlag: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setNewChatFlag: (state) => {
      state.isNewChatFlag = true;
    },
    clearNewChatFlag: (state) => {
      state.isNewChatFlag = false;
    },
  },
});

export const { setNewChatFlag } = chatSlice.actions;
export const { clearNewChatFlag } = chatSlice.actions;

export const selectChatInfo = (state: { chat: ChatState }) => state.chat;

export default chatSlice.reducer;
