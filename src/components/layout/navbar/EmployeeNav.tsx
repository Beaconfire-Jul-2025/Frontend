import {
  HomeOutlined,
  IdcardOutlined,
  FileTextOutlined,
  BankOutlined,
} from "@ant-design/icons";

const EmployeeNav = {
  route: {
    path: "/employee",
    routes: [
      { path: "/employee", name: "Home", icon: <HomeOutlined /> },
      {
        path: "/employee/personal-info",
        name: "Personal Information",
        icon: <IdcardOutlined />,
        routes: [
          { path: "/employee/personal-info/basic", name: "Basic Info" },
          {
            path: "/employee/personal-info/documents",
            name: "Documents Submitted",
          },
        ],
      },
      {
        path: "/employee/visa",
        name: "Visa Status Management",
        icon: <FileTextOutlined />,
        routes: [
          { path: "/employee/visa/info", name: "Visa Info" },
          { path: "/employee/visa/documents", name: "Visa Documents" },
        ],
      },
      {
        path: "/employee/housing",
        name: "Housing",
        icon: <BankOutlined />,
        routes: [
          { path: "/employee/housing/details", name: "House Detail" },
          { path: "/employee/housing/report", name: "Facility Report" },
        ],
      },
    ],
  },
};

export default EmployeeNav;
