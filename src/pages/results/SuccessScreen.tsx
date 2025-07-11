import React from "react";
import { Button, Result } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const SuccessScreen: React.FC = () => (
  <Result
    status="success"
    icon={
      <CheckCircleOutlined style={{ fontSize: "72px", color: "#52c41a" }} />
    }
    title={
      <span className="text-4xl font-bold text-gray-800">
        Onboarding Completed Successfully!
      </span>
    }
    subTitle={
      <span className="text-lg text-gray-600">
        Thank you for providing your information. You're all set!
      </span>
    }
    extra={[
      <Button
        type="primary"
        key="dashboard"
        size="large"
        className="bg-blue-500 hover:bg-blue-600 rounded-lg px-8 py-4 text-xl font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => (window.location.href = "/employee")}
      >
        Go to Dashboard
      </Button>,
    ]}
  />
);

export default SuccessScreen;
