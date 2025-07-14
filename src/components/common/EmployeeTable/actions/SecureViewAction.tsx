// src/components/common/EmployeeTable/actions/SecureViewAction.tsx
import React from "react";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  userId: string;
  mode?: string; // optional, only used in SB
}

const RealSecureViewAction: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleView = () => {
    const basePath = location.pathname;
    navigate(`${basePath}/review/${userId}`);
  };

  return (
    <Button
      type="link"
      size="small"
      icon={<EyeOutlined />}
      onClick={handleView}
    >
      View
    </Button>
  );
};

const SBSecureViewAction: React.FC<Props> = ({ userId, mode }) => (
  <Button
    type="link"
    size="small"
    icon={<EyeOutlined />}
    onClick={() => alert(`View profile for ${userId} (mode=${mode})`)}
  >
    View
  </Button>
);

export const SecureViewAction =
  import.meta.env.NODE_ENV === "test" || import.meta.env.STORYBOOK
    ? SBSecureViewAction
    : RealSecureViewAction;
