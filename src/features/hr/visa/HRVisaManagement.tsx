import React from "react";
import EmployeeTable from "@/components/common/EmployeeTable/EmployeeTable.tsx";

const HRVisaManagement: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <EmployeeTable view="visa" />
    </div>
  );
};

export default HRVisaManagement;
