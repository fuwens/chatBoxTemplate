/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-02 13:49:54
 * @Description: chat box。
 */
import React, { useRef } from "react";
import { Button } from "antd";
import HistoryList from "@/pages/chat/compontents/HistoryList";
import UserPanel from "@/pages/chat/compontents/UserPanel";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setNewChatFlag } from "@/redux/reducer/ChatSlice";

const ChatBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const goNewChat = () => {
    navigate("/chat");
    dispatch(setNewChatFlag());
  };
  return (
    <div className="w-full h-full flex flex-row overflow-hidden">
      <div className="hidden md:block w-[250px] bg-[#F8F8FA] border-r-1 border-r-[#E5E5E5] ">
        <div className="p-4">
          <Button
            color="primary"
            onClick={goNewChat}
            className="w-full"
            variant="outlined"
          >
            + 开始新对话
          </Button>
        </div>
        <div className="flex flex-col h-full overflow-hidden relative">
          <HistoryList />
          <UserPanel />
        </div>
      </div>
      <div className="flex-1 bg-white px-6">
        <Outlet />
      </div>
    </div>
  );
};
export default ChatBox;
