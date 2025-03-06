/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-05 16:33:39
 * @Description: Chat相关的slice。
 */
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ChatState {
  currentConversation: {
    key: string;
    label: string;
    group: string;
  };
}

// Define the initial state using that type
const initialState: ChatState = {
  currentConversation: {
    key: "",
    label: "", // 对话名称
    group: "", // 对话分组
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatInfo: (state, action) => {
      state.key = action.payload.key;
      state.label = action.payload.label;
      state.group = action.payload.group;
    },
    clearChatInfo: (state) => {
      state.key = "";
      state.label = "";
      state.group = "";
    },
  },
});

export const { setChatInfo } = chatSlice.actions;
export const { clearChatInfo } = chatSlice.actions;

export const selectChatInfo = (state: { chat: ChatState }) => state.chat;

export default chatSlice.reducer;
