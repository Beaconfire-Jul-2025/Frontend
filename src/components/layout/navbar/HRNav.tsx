import {
  HomeOutlined,
  UserOutlined,
  FileProtectOutlined,
  TeamOutlined,
  BankOutlined,
  FileSearchOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

const HRNav = {
  route: {
    path: "/hr",
    routes: [
      { path: "/hr/home", name: "Home", icon: <HomeOutlined /> },
      {
        path: "/hr/employees",
        name: "Employee Profiles",
        icon: <UserOutlined />,
      },
      {
        path: "/hr/visa",
        name: "Visa Status Management",
        icon: <FileProtectOutlined />,
      },
      {
        path: "/hr/hiring",
        name: "Hiring Management",
        icon: <TeamOutlined />,
        routes: [
          {
            path: "/hr/hiring/review",
            name: "Application Review",
            icon: <FileSearchOutlined />,
          },
          {
            path: "/hr/hiring/invite",
            name: "Send New Invite",
            icon: <FileAddOutlined />,
          },
        ],
      },
      {
        path: "/hr/housing",
        name: "House Management",
        icon: <BankOutlined />,
        routes: [
          { path: "/hr/housing/basic", name: "Basic Info" },
          { path: "/hr/housing/facility", name: "Facility Info" },
          { path: "/hr/housing/report", name: "Facility Reports" },
        ],
      },
    ],
  },
};

export default HRNav;
