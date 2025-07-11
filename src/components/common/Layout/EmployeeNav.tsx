import {
  HomeOutlined,
  IdcardOutlined,
  FileTextOutlined,
  BankOutlined,
} from "@ant-design/icons";

const EmployeeNav = {
  route: {
    path: "/",
    routes: [
      { path: "/home", name: "Home", icon: <HomeOutlined /> },
      {
        path: "/personal-info",
        name: "Personal Information",
        icon: <IdcardOutlined />,
        routes: [
          { path: "/personal-info/basic", name: "Basic Info" },
          { path: "/personal-info/documents", name: "Documents Submitted" },
        ],
      },
      {
        path: "/visa",
        name: "Visa Status Management",
        icon: <FileTextOutlined />,
        routes: [
          { path: "/visa/info", name: "Visa Info" },
          { path: "/visa/documents", name: "Visa Documents" },
        ],
      },
      {
        path: "/housing",
        name: "Housing",
        icon: <BankOutlined />,
        routes: [
          { path: "/housing/details", name: "House Detail" },
          { path: "/housing/report", name: "Facility Report" },
        ],
      },
    ],
  },
};

export default EmployeeNav;
