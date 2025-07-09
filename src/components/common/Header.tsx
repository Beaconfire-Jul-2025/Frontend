import React from "react";
import { Avatar, Button, Dropdown, Layout, Space } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getUser, logout } from "../../utils/authUtils";
import type { User } from "../../types/auth";
import type { ItemType } from "antd/es/menu/interface";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const user: User | null = getUser();

  const handleLogout = () => {
    logout();
  };

  const menuItems: ItemType[] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="bg-white shadow-sm border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800 m-0">{title}</h1>
      </div>

      <div className="flex items-center">
        <Space>
          <span className="text-sm text-gray-600">
            Welcome, {user?.username}
          </span>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              icon={<Avatar size="small" icon={<UserOutlined />} />}
              className="flex items-center"
            />
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
