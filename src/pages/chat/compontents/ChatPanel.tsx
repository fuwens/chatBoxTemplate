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
import React from "react";
import markdownit from "markdown-it";
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

const ChaPanel = () => {
  const [content, setContent] = React.useState("");
  const [isRequesting, setIsRequesting] = React.useState(false);

  // Agent for request
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onUpdate }) => {
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
          conversation_id: "",
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
  const { onRequest, messages } = useXChat({
    agent,
    requestPlaceholder: "请稍等...",
    requestFallback: "服务器错误",
  });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <Bubble.List
        roles={roles}
        className="py-10 flex-1 overflow-y-auto"
        items={messages.map(({ id, message, status }) => ({
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

export default ChaPanel;
