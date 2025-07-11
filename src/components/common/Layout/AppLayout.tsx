import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import React, { useState } from "react";
import EmployeeNav from "./EmployeeNav.tsx";
import HRNav from "./HRNav.tsx";

type Role = "HR" | "EMPLOYEE";

interface AppLayoutProps {
  role: Role;
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ role, children }) => {
  // Destructure children from props
  const [pathname, setPathname] = useState("/home");

  const layoutProps = role === "HR" ? HRNav : EmployeeNav;

  return (
    <div style={{ height: "100vh" }}>
      <ProLayout
        layout="mix"
        splitMenus
        fixSiderbar
        {...layoutProps}
        location={{ pathname }}
        avatarProps={{
          src: "https://i.pravatar.cc/100",
          size: "small",
          title: "User",
        }}
        menuItemRender={(item, dom) => (
          <div onClick={() => setPathname(item.path || "/home")}>{dom}</div>
        )}
      >
        <PageContainer>
          <ProCard style={{ minHeight: 800 }}>
            {children} {/* Render the children here */}
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default AppLayout;
