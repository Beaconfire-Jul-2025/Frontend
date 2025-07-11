import React from "react";
import { Button, Result } from "antd"; // Removed Flex import
import { SmileOutlined } from "@ant-design/icons";

interface WelcomeSplashProps {
  onStart: () => void;
}

const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ onStart }) => (
  <Result
    icon={<SmileOutlined style={{ fontSize: "72px", color: "#1890ff" }} />}
    title={
      <span className="text-4xl font-bold text-gray-800">
        Welcome to Employee Onboarding!
      </span>
    }
    subTitle={
      <span className="text-lg text-gray-600">
        Let's get you set up for success at our company.
      </span>
    }
    extra={
      <Button
        type="primary"
        size="large"
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-600 rounded-lg px-8 py-4 text-xl font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Start Onboarding
      </Button>
    }
  />
);

export default WelcomeSplash;
