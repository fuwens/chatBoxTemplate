import { lazy, Suspense } from "react";
import { Spin } from "antd";

type importParamsType = () => Promise<any>;
export const LazyLoadMethod = (importCom: importParamsType) => {
  const Comp = lazy(importCom);
  return (
    <Suspense fallback={<Spin />}>
      <Comp />
    </Suspense>
  );
};
