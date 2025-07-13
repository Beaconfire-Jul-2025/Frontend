import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const HRDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>HR Dashboard</Title>
      <Paragraph>Welcome to the HR Portal.</Paragraph>
      <Paragraph>This is a placeholder for the HR dashboard content.</Paragraph>
    </div>
  );
};

export default HRDashboard;
