/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-02 14:50:07
 * @Description: redux store。
 */
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/redux/reducer/UserSlice";
import chatReducer from "@/redux/reducer/ChatSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // 用户详信息
    chat: chatReducer, // 聊天信息
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
