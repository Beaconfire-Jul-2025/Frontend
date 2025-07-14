import React from "react";
import { Card, Typography } from "antd";
import EmployeeTable from "@/components/common/EmployeeTable/EmployeeTable.tsx";

const { Title } = Typography;

const HiringManagementApplication: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <EmployeeTable view="hiring" />
    </div>
  );
};

export default HiringManagementApplication;
