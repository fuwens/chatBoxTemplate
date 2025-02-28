/*
 * @Author: fuwens
 * @LastEditors: fuwens@163.com
 * @Date: 2025-02-21 10:40:27
 * @Description: 介绍文件的作用、文件的入参、出参。
 */
import React from "react";

import { useRoutes } from "react-router-dom";
import routes from "@/router";

const App: React.FC = () => {
  const outlet = useRoutes(routes);
  return outlet;
};
export default App;
