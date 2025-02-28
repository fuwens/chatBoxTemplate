import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigateTo = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起, 访问的页面不存在。"
      extra={
        <Button onClick={() => navigateTo("/")} type="primary">
          返回首页
        </Button>
      }
    />
  );
};

export default NotFound;
