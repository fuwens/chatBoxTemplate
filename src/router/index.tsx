import type { RouteObject } from "react-router-dom";
import { LazyLoadMethod } from "@/utils/RouterUtlis";

const index: RouteObject[] = [
  {
    path: "/",
    element: LazyLoadMethod(() => import("@pages/Home")),
  },

  // 404
  {
    path: "*",
    element: LazyLoadMethod(() => import("@pages/404")),
  },
];
export default index;
