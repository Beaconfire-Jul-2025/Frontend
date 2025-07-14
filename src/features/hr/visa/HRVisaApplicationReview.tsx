import React from "react";
import { useParams } from "react-router-dom";
import { EmployeeProfile } from "@/components/common/EmployeeProfile";

const HRVisaApplicationReview: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();

  return <EmployeeProfile employeeId={employeeId} mode="hr" />;
};

export default HRVisaApplicationReview;
