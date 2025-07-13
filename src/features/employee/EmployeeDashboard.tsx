import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const EmployeeDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Employee Dashboard</Title>
      <Paragraph>Welcome to the Employee Portal.</Paragraph>
      <Paragraph>
        This is a placeholder for the employee dashboard content.
      </Paragraph>
    </div>
  );
};

export default EmployeeDashboard;
