/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-02-28 16:02:05
 * @Description: routers。
 */
import { type RouteObject, Navigate } from "react-router-dom";
import { LazyLoadMethod } from "@/utils/RouterUtlis";

const index: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/chat" />,
  },
  {
    path: "/",
    element: LazyLoadMethod(() => import("@/pages/index")),
    children: [
      {
        path: "chat",
        element: LazyLoadMethod(() => import("@/pages/chat/index")),
        children: [
          {
            path: "",
            element: LazyLoadMethod(
              () => import("@/pages/chat/compontents/ChatPanel")
            ),
          },
          {
            path: "c/:cid",
            element: LazyLoadMethod(
              () => import("@/pages/chat/compontents/ChatPanel")
            ),
          },
        ],
      },
    ],
  },

  // 404
  {
    path: "*",
    element: LazyLoadMethod(() => import("@pages/404")),
  },
];
export default index;
