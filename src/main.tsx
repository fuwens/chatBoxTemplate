/*
 * @Author: fuwens
 * @LastEditors: fuwens@163.com
 * @Date: 2025-02-21 10:40:27
 * @Description: main。
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "./styles/index.css";

import locale from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={locale}>
          <AntdApp>
            <App />
          </AntdApp>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
