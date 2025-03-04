/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-03 20:41:45
 * @Description: 用户信息。
 */
import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import avatar from "@/assets/svg/avatar.svg";

const UerPanel: React.FC = () => {
  return (
    <div className="w-full  absolute bottom-0 p-4 mb:p-0  md:bottom-12 bg-white">
      <div className="flex justify-between items-center pt-4  mb-5 border-t-1 border-t-[#E5E5E5]">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="" />
          <span>用户名</span>
        </div>
        <QuestionCircleOutlined />
      </div>
    </div>
  );
};

export default UerPanel;
