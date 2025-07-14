import React from "react";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface ViewActionProps {
  record: any;
  viewPath?: string;
}

export const ViewAction: React.FC<ViewActionProps> = ({
  record,
  viewPath = "/employee/profile",
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`${viewPath}/${record.id}`);
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
