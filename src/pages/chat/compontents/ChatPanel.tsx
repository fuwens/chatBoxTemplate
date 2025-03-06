/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-04 14:26:42
 * @Description: chat box。
 */
import { UserOutlined } from "@ant-design/icons";
import {
  Bubble,
  Sender,
  useXAgent,
  useXChat,
  XStream,
  type BubbleProps,
} from "@ant-design/x";
import { type GetProp, Typography } from "antd";
import React, { useEffect } from "react";
import markdownit from "markdown-it";
import { useLocation, Outlet } from "react-router-dom";
import { ConvertChatData, getUrlCidParameter } from "@/utils/JsTools";

const md = markdownit({ html: true, breaks: true });
const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Typography>
    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
    <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
  </Typography>
);

const roles: GetProp<typeof Bubble.List, "roles"> = {
  ai: {
    placement: "start",
    avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 900,
    },
  },
  local: {
    placement: "end",
    avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
  },
};

const ChatPanel = () => {
  const [content, setContent] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([]);
  const [historyListMessages, setHistoryListMessages] = React.useState([]);
  const [isRequesting, setIsRequesting] = React.useState(false);
  const location = useLocation();

  // Agent for request
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onUpdate }) => {
      const conversation_id = getUrlCidParameter(window.location.href);
      let answerContent = "";
      const response = await fetch("/api/v1/chat-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer app-FLjfPKU29VkzwR5FDmiBE4yC",
        },
        body: JSON.stringify({
          inputs: {},
          query: message,
          response_mode: "streaming",
          conversation_id: conversation_id,
          user: "abc-123",
          files: [],
        }),
      });
      // .....

      for await (const chunk of XStream({
        readableStream: response.body,
      })) {
        console.log(chunk);
        const data = chunk.data && JSON.parse(chunk.data);
        if (data?.event === "workflow_started") {
          setIsRequesting(true);
        }
        if (data?.event === "message") {
          setIsRequesting(false);
          answerContent += data?.answer || "";
          console.log("answerContent", answerContent);
          onUpdate(answerContent);
        }
        if (data?.event === "workflow_finished") {
          onSuccess(answerContent);
        }
      }
    },
  });

  // Chat messages
  const { onRequest, messages, setMessages } = useXChat({
    agent,
    requestPlaceholder: "请稍等...",
    requestFallback: "服务器错误",
  });
  // 处理聊天消息和历史记录
  useEffect(() => {
    console.log("messages-------", messages);
    const newMessages = historyListMessages.concat(messages);
    setChatMessages(newMessages);
  }, [messages, historyListMessages]);

  // 获取当前对话的历史记录
  useEffect(() => {
    console.log("location", location);
    const conversation_id = location.pathname.split("/c/").pop();

    if (conversation_id && conversation_id !== "/chat") {
      setMessages([]);
      // 获取当前对话的历史记录
      const params = {
        user: "abc-123",
        conversation_id: conversation_id,
      };
      const searchParams = new URLSearchParams(params).toString();
      // Fetch history list
      fetch(`/api/v1/messages?${searchParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer app-FLjfPKU29VkzwR5FDmiBE4yC",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setHistoryListMessages(ConvertChatData(res.data));
        });
    } else {
      // 新建一个对话
      setChatMessages([]);
      setContent("");
      setIsRequesting(false);
      setMessages([]);
    }
  }, [location]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      {chatMessages.length === 0 && (
        <div className="sm:w-xl h-26 absolute top-0 left-0 right-0 mx-auto mt-10 bg-[#f4f7ff] p-4 rounded-lg shadow-md flex items-center flex-col">
          <p className="text-2xl">👏🏻 你好 ，我是汇生AI智能体</p>
          <p className="">基于行业大模型的AGI产品解决方案，为您提供专业服务~</p>
        </div>
      )}
      <Outlet />
      <Bubble.List
        roles={roles}
        className="py-10 flex-1 overflow-y-auto"
        items={chatMessages.map(({ id, message, status }) => ({
          key: id,
          // loading: status === "loading",
          role: status === "local" ? "local" : "ai",
          content: renderMarkdown(message),
        }))}
      />
      <Sender
        className="absolute bottom-2 bg-white"
        loading={isRequesting}
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

export default ChatPanel;
