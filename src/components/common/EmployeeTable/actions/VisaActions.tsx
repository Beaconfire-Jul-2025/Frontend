import React from "react";
import { Button } from "antd";

export const VisaActions: React.FC<{ record: any }> = ({ record }) => (
  <>
    <Button type="link" size="small">
      Renew
    </Button>
    <Button danger size="small">
      Revoke
    </Button>
  </>
);
