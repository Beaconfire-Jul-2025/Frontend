import { EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

let useNavigate: () => (path: string) => void;
if (process.env.STORYBOOK === 'true') {
  useNavigate = () => (_path: string) => {};
} else {
  useNavigate = require('@umijs/max').useNavigate;
}

export const VisaActions: React.FC<{ record: any }> = ({ _record }) => (
  <>
    <Button type="link" size="small">
      Renew
    </Button>
    <Button danger size="small">
      Revoke
    </Button>
  </>
);

interface SecureViewActionProps {
  userId: string;
  mode?: string;
}

const RealSecureViewAction: React.FC<SecureViewActionProps> = ({ userId }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/employee/view/${userId}`);
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

const SBSecureViewAction: React.FC<SecureViewActionProps> = ({
  userId,
  mode,
}) => (
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
  process.env.NODE_ENV === 'test' || process.env.STORYBOOK === 'true'
    ? SBSecureViewAction
    : RealSecureViewAction;
