/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-02-28 16:02:05
 * @Description: page 主入口。
 */
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import CommonHeader from "@/components/layout/CommonHeader";

const PagesIndex: React.FC = () => {
  return (
    <Layout className="w-screen h-screen">
      <CommonHeader />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default PagesIndex;
