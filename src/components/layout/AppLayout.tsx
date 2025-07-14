import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEmployeeAvatar } from "@/api/employee";
import EmployeeNav from "./navbar/EmployeeNav.tsx";
import HRNav from "./navbar/HRNav.tsx";

type Role = "HR" | "EMPLOYEE";

interface AppLayoutProps {
  role: Role;
  children?: React.ReactNode;
}

// Move the menu item renderer outside the component to avoid re-renders
const MenuItemRenderer = ({
  item,
  dom,
  navigate,
}: {
  item: any;
  dom: React.ReactNode;
  navigate: (path: string) => void;
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => navigate(item.path ?? "/home")}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        navigate(item.path ?? "/home");
      }
    }}
    style={{ cursor: "pointer" }}
  >
    {dom}
  </div>
);

const AppLayout: React.FC<AppLayoutProps> = ({ role, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "https://i.pravatar.cc/100",
  );

  const layoutProps = role === "HR" ? HRNav : EmployeeNav;

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarPath = await getEmployeeAvatar();
        setAvatarSrc(avatarPath);
      } catch (error) {
        console.error("Failed to fetch avatar:", error);
        // Keep default avatar on error
      }
    };

    fetchAvatar();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <ProLayout
        layout="mix"
        splitMenus
        fixSiderbar
        {...layoutProps}
        location={{ pathname: location.pathname }}
        avatarProps={{
          src: avatarSrc,
          size: "small",
          title: "User",
        }}
        menuItemRender={(item, dom) => (
          <MenuItemRenderer item={item} dom={dom} navigate={navigate} />
        )}
      >
        <PageContainer>
          <ProCard style={{ minHeight: 800 }}>{children}</ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default AppLayout;
