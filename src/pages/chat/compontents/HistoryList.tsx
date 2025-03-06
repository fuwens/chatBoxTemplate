/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-03 16:59:26
 * @Description: 聊天左侧历史记录。
 */
import React, { use, useEffect, useState } from "react";
import { Conversations, type ConversationsProps } from "@ant-design/x";
import { type GetProp } from "antd";
import { ConvertHistoryData } from "@/utils/JsTools";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectChatStore,
  clearNewChatFlag,
  clearLoadHistoryFlag,
} from "@/redux/reducer/ChatSlice";

const HistoryList: React.FC = () => {
  const [items, setItems] = useState<GetProp<ConversationsProps, "items">>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultActiveKey, setDefaultActiveKey] = useState<string | undefined>(
    undefined
  );
  const [activeKey, setActiveKey] = useState<string>("item1");
  const dispatch = useAppDispatch();
  const ChatStore = useAppSelector(selectChatStore);
  const fetchHistoryList = () => {
    const params = {
      user: "abc-123",
      limit: 20,
    };
    const searchParams = new URLSearchParams(params).toString();
    // Fetch history list
    fetch(`/api/v1/conversations?${searchParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer app-FLjfPKU29VkzwR5FDmiBE4yC",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(ConvertHistoryData(res.data));
        setItems(ConvertHistoryData(res.data));
      });
  };

  useEffect(() => {
    ChatStore.isLoadHistoryFlag && fetchHistoryList();
    dispatch(clearLoadHistoryFlag());
  }, [ChatStore.isLoadHistoryFlag]);

  useEffect(() => {
    fetchHistoryList();
  }, []);

  const goChat = (key: string) => {
    console.log(key);
    navigate("/chat/c/" + key);
    setActiveKey(key);
  };

  useEffect(() => {
    if (ChatStore.isNewChatFlag) {
      setActiveKey("");
      dispatch(clearNewChatFlag());
    }
  }, [ChatStore.isNewChatFlag]);

  useEffect(() => {
    const conversation_id = location.pathname.split("/c/").pop();
    if (conversation_id && conversation_id !== "/chat") {
      setActiveKey(conversation_id);
    }
  }, []);

  // useEffect(() => {
  //   if (ChatStore.isNewChatFlag) {
  //     const conversation_id = location.pathname.split("/c/").pop();
  //     if (conversation_id && conversation_id !== "/chat") {
  //       setDefaultActiveKey(conversation_id);
  //     }
  //   }
  // }, [ChatStore.isNewChatFlag]);

  // Customize the style of the container
  const style = {
    // width: 256,
    // background: token.colorBgContainer,
    // borderRadius: token.borderRadius,
    paddingBottom: 160,
  };
  return (
    <>
      {/* 超出出现滚动条 */}
      {items.length > 0 && (
        <Conversations
          items={items}
          // activeKey={defaultActiveKey}
          activeKey={activeKey}
          defaultActiveKey={defaultActiveKey}
          style={style}
          onActiveChange={goChat}
          groupable
        />
      )}
    </>
  );
};
export default HistoryList;
