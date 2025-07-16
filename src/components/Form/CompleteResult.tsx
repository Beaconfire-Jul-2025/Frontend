import React from 'react';
import { Result, Button } from 'antd';

interface CompleteResultProps {
  onFinish?: () => void;
}

const CompleteResult: React.FC<CompleteResultProps> = ({ onFinish }) => (
  <Result
    status="success"
    title="Onboarding Complete!"
    subTitle="Your profile has been set up successfully."
    extra={
      onFinish ? (
        <Button type="primary" onClick={onFinish}>
          Go to Dashboard
        </Button>
      ) : null
    }
  />
);

export default CompleteResult;

