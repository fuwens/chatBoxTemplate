/*
 * @Author: fuwen
 * @LastEditors: fuwens@163.com
 * @Date: 2025-03-02 15:13:15
 * @Description: 头部组件。
 */

import React, { useState } from "react";
import { Drawer, Button } from "antd";
import HistoryList from "@/pages/chat/compontents/HistoryList";
import UserPanel from "@/pages/chat/compontents/UserPanel";
import Logo from "@/assets/imgaes/logo.png";
import MenuSvg from "@/assets/svg/menu.svg";
import MenuMore from "@/assets/svg/menu-more.svg";
import MenuNew from "@/assets/svg/menu-new.svg";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/redux/hooks";
import { setNewChatFlag } from "@/redux/reducer/ChatSlice";

const CommonHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const goNewChat = () => {
    navigate("/chat");
    dispatch(setNewChatFlag());
  };

  return (
    <header className="h-14">
      {/* pc */}
      <div className="hidden md:block h-full">
        <div className="flex items-center justify-between h-full border-b border-gray-200">
          <div className="flex justify-center items-center w-[250px]">
            <img src={Logo} alt="logo" className="h-10" />
            <span className="text-lg font-bold">汇生咨询</span>
          </div>
          <div className="flex items-center pr-14">
            <div className="mr-4 text-[#1678FF] border-b-[#1678FF] border-b-2">
              AI智能体
            </div>
            <div className="mr-4">文档中心</div>
            {/* <div className="mr-4">联系我们</div> */}
          </div>
        </div>
      </div>
      {/* mobile nav */}
      <div className="block md:hidden h-full">
        <div className="flex items-center justify-between h-full  px-6">
          <div className="flex items-center ">
            <img src={MenuSvg} alt="menu" onClick={showDrawer} />
          </div>
          <div>新对话</div>
          <div className="flex items-center gap-2">
            <img onClick={() => goNewChat()} src={MenuNew} alt="menu-new" />
            <img src={MenuMore} alt="menu-more" />
          </div>
        </div>
      </div>
      <Drawer
        placement={"left"}
        closable={false}
        destroyOnClose={true}
        onClose={onClose}
        open={open}
        key={"placement"}
        width={270}
      >
        <div className="w-full h-full flex flex-row overflow-hidden relative">
          <HistoryList />
          <UserPanel />
        </div>
      </Drawer>
    </header>
  );
};
export default CommonHeader;
