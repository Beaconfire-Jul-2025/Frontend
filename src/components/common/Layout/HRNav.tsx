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
    path: "/",
    routes: [
      { path: "/home", name: "Home", icon: <HomeOutlined /> },
      { path: "/employees", name: "Employee Profiles", icon: <UserOutlined /> },
      {
        path: "/visa",
        name: "Visa Status Management",
        icon: <FileProtectOutlined />,
      },
      {
        path: "/hiring",
        name: "Hiring Management",
        icon: <TeamOutlined />,
        routes: [
          {
            path: "/hiring/review",
            name: "Application Review",
            icon: <FileSearchOutlined />,
          },
          {
            path: "/hiring/invite",
            name: "Send New Invite",
            icon: <FileAddOutlined />,
          },
        ],
      },
      {
        path: "/housing",
        name: "House Management",
        icon: <BankOutlined />,
        routes: [
          { path: "/housing/basic", name: "Basic Info" },
          { path: "/housing/facility", name: "Facility Info" },
          { path: "/housing/report", name: "Facility Reports" },
        ],
      },
    ],
  },
};

export default HRNav;
