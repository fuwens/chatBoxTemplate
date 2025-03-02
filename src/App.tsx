/*
 * @Author: fuwens
 * @LastEditors: fuwens@163.com
 * @Date: 2025-02-21 10:40:27
 * @Description: APP。
 */
import React from "react";

import { useRoutes } from "react-router-dom";
import routes from "@/router";

const App: React.FC = () => {
  const outlet = useRoutes(routes);
  return outlet;
};
export default App;
