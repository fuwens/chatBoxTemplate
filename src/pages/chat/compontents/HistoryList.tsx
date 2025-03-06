/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-03 16:59:26
 * @Description: 聊天左侧历史记录。
 */
import React, { useEffect, useState } from "react";
import { Conversations, type ConversationsProps } from "@ant-design/x";
import { type GetProp } from "antd";
import { ConvertHistoryData, updateUrlParams } from "@/utils/JsTools";
import { useNavigate } from "react-router-dom";

const HistoryList: React.FC = () => {
  const [items, setItems] = useState<GetProp<ConversationsProps, "items">>([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        console.log(res);
        setItems(ConvertHistoryData(res.data));
      });
  }, []);

  const goChat = (key: string) => {
    console.log(key);
    navigate("/chat/c/" + key);
  };

  // Customize the style of the container
  const style = {
    // width: 256,
    // background: token.colorBgContainer,
    // borderRadius: token.borderRadius,
    paddingBottom: 160,
  };
  return (
    // 超出出现滚动条
    <Conversations
      items={items}
      defaultActiveKey="item1"
      style={style}
      onActiveChange={goChat}
      groupable
    />
  );
};
export default HistoryList;
