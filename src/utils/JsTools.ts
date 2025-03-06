/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-05 14:37:23
 * @Description: 一些js tools。
 */
export const ConvertHistoryData = (data: any) => {
  // 获取当前时间
  const now = new Date();
  const startOfToday =
    new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
  const startOfWeek =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    ).getTime() / 1000;

  const result = data.map((item: any, index: any) => {
    let group;
    if (item.created_at >= startOfToday) {
      group = "今天";
    } else if (item.created_at >= startOfWeek) {
      group = "本周";
    } else {
      group = "更早";
    }

    return {
      key: item.id,
      label: item.name,
      group: group,
    };
  });
  return result;
};

export const ConvertChatData = (data: any) => {
  const transformedMessages: { id: string; message: any; status: string }[] =
    [];

  data.forEach((message: { query: any; answer: any }, index: any) => {
    // 第一条消息：用户输入
    transformedMessages.push({
      id: generateRandomString(12), // 生成唯一的ID
      message: message.query, // 用户输入的内容
      status: "local", // 状态为 "local"
    });

    // 第二条消息：模型回复
    transformedMessages.push({
      id: generateRandomString(12), // 生成唯一的ID
      message: message.answer || "", // 模型回复的内容
      status: "ai", // 状态为 "ai"
    });
  });

  return transformedMessages;
};

export const generateRandomString = (num?: number): string => {
  // 定义包含所有可能字符的字符集
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = num ?? 12;

  // 循环 12 次，每次从字符集中随机选择一个字符
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

/**
 * 更新URL参数
 * @param {Object} options - 配置对象
 * @param {string} [options.action='set'] - 操作类型：'set'（添加/修改）、'delete'（删除）
 * @param {string} options.key - 参数键名
 * @param {string} [options.value] - 参数值（仅在 action 为 'set' 时使用）
 * @param {boolean} [options.replace=false] - 是否替换当前历史记录（默认是 pushState）
 */
export const updateUrlParams = (options: {
  action: "set" | "delete";
  key: string;
  value: string;
  replace: boolean;
}) => {
  const { action = "set", key, value, replace = false } = options;

  // 获取当前URL
  const url = new URL(window.location.href);

  // 根据操作类型处理参数
  if (action === "set") {
    if (!key || value === undefined) {
      console.error("请提供 key 和 value 参数");
      return;
    }
    url.searchParams.set(key, value); // 添加或修改参数
  } else if (action === "delete") {
    if (!key) {
      console.error("请提供 key 参数");
      return;
    }
    url.searchParams.delete(key); // 删除参数
  } else {
    console.error("无效的 action 参数");
    return;
  }

  // 更新浏览器URL
  if (replace) {
    window.history.replaceState({}, "", url); // 替换当前历史记录
  } else {
    window.history.pushState({}, "", url); // 添加新历史记录
  }
};

// 获取URL参数
export const getUrlCidParameter = (url: string) => {
  const parts = url.split("/");
  const index = parts.indexOf("c");
  if (index !== -1 && index < parts.length - 1) {
    return parts[index + 1];
  }
  return "";
};
