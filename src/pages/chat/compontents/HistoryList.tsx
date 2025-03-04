/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-03 16:59:26
 * @Description: 聊天左侧历史记录。
 */
import React from "react";
import { Conversations, type ConversationsProps } from "@ant-design/x";
import { type GetProp } from "antd";

const HistoryList: React.FC = () => {
  const items: GetProp<ConversationsProps, "items"> = Array.from({
    length: 5,
  }).map((_, index) => ({
    key: `item${index + 1}`,
    label: `Conversation Item ${index + 1}`,
    disabled: index === 3,
    group: index === 1 ? "今天" : index === 2 ? "本周" : "更早",
  }));
  // const { token } = theme.useToken();

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
      groupable
    />
  );
};
export default HistoryList;
