import React from 'react';
import { Result, Button } from 'antd';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => (
  <Result
    status="info"
    title="Welcome to Employee Onboarding!"
    subTitle="Let's get you set up. Click Start to begin the onboarding process."
    extra={
      <Button type="primary" size="large" onClick={onStart}>
        Start
      </Button>
    }
  />
);

export default Welcome;

