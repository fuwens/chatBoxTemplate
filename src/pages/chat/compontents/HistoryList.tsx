/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-03 16:59:26
 * @Description: 聊天左侧历史记录。
 */
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const getHistory = () => {
  return (
    // 写一个ol标签，里面有li标签，li标签有选中和未选中的状态
    <ul>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200 bg-gray-300 rounded-md mb-0.5">
        你好的我是测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
      <li className="p-1.5 cursor-pointer hover:bg-gray-200  rounded-md mb-0.5">
        我的另一个测试问题
      </li>
    </ul>
  );
};

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "今天",
    children: getHistory(),
  },
  {
    key: "2",
    label: "昨天",
    children: getHistory(),
  },
  {
    key: "3",
    label: "更早",
    children: getHistory(),
  },
];

const HistoryList: React.FC = () => {
  return (
    // 超出出现滚动条
    <div className="flex-1 w-full h-full overflow-y-auto">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition={"end"}
        ghost
        items={items}
      />
    </div>
  );
};
export default HistoryList;
