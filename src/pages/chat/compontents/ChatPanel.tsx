/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-04 14:26:42
 * @Description: chat box。
 */
import { UserOutlined } from "@ant-design/icons";
import { Bubble, Sender, useXAgent, useXChat } from "@ant-design/x";
import { type GetProp } from "antd";
import React from "react";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const roles: GetProp<typeof Bubble.List, "roles"> = {
  ai: {
    placement: "start",
    avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
  },
  local: {
    placement: "end",
    avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
  },
};

let mockSuccess = false;

const ChaPanel = () => {
  const [content, setContent] = React.useState("");

  // Agent for request
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onError }) => {
      await sleep();

      mockSuccess = !mockSuccess;

      if (mockSuccess) {
        onSuccess(`Mock success return. You said: ${message}`);
      }

      onError(new Error("Mock request failed"));
    },
  });

  // Chat messages
  const { onRequest, messages } = useXChat({
    agent,
    requestPlaceholder: "Waiting...",
    requestFallback: "Mock failed return. Please try again later.",
  });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <Bubble.List
        roles={roles}
        className="py-10 flex-1 overflow-y-auto"
        items={messages.map(({ id, message, status }) => ({
          key: id,
          loading: status === "loading",
          role: status === "local" ? "local" : "ai",
          content: message,
        }))}
      />
      <Sender
        className="absolute bottom-2 bg-white"
        loading={agent.isRequesting()}
        value={content}
        onChange={setContent}
        onSubmit={(nextContent) => {
          onRequest(nextContent);
          setContent("");
        }}
      />
    </div>
  );
};

export default ChaPanel;
