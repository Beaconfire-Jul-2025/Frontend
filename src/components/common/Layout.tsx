import React from "react";
import { Layout as AntLayout } from "antd";
import Header from "./Header";

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <AntLayout className="min-h-screen">
      <Header title={title} />
      <Content className="p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">{children}</div>
      </Content>
    </AntLayout>
  );
};

export default Layout;
