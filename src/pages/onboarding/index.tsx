import React, { useState } from 'react';
import { Steps, Button, Card, message } from 'antd';
import { history } from '@umijs/max';
import NameInformation from './components/NameInformation';
import Welcome from './components/Welcome';
import CompleteResult from '@/components/Form/CompleteResult';
import type { NameData } from '@/components/Form/NameForm/data';

const { Step } = Steps;

interface OnboardingData {
  nameInfo?: NameData;
}

const OnboardingPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<'welcome' | 'form' | 'complete'>('welcome');
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const steps = [
    {
      title: 'Name Information',
      content: 'name-information',
    },
    // Add more steps here as needed
    {
      title: 'Complete',
      content: 'complete',
    },
  ];

  const next = () => {
    if (current < steps.length - 2) {
      setCurrent(current + 1);
    } else {
      setPhase('complete');
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleNameInfoSubmit = (values: NameData) => {
    setOnboardingData(prev => ({ ...prev, nameInfo: values }));
    message.success('Name information saved successfully!');
    next();
  };

  const handleComplete = () => {
    message.success('Onboarding completed successfully!');
    history.push('/welcome');
  };

  const handleStart = () => {
    setPhase('form');
  };

  const renderStepContent = () => {
    switch (current) {
      case 0:
        return (
          <NameInformation
            initialValues={onboardingData.nameInfo || {
              firstName: '',
              lastName: '',
              middleName: '',
              preferredName: '',
            }}
            onFinish={handleNameInfoSubmit}
            onCancel={() => history.push('/welcome')}
          />
        );
      // case 1:
      //   return (
      //     <div style={{ textAlign: 'center', padding: '50px 0' }}>
      //       <h2>Onboarding Complete!</h2>
      //       <p>Welcome to the platform. Your information has been saved successfully.</p>
      //       <Button type="primary" size="large" onClick={handleComplete}>
      //         Get Started
      //       </Button>
      //     </div>
      //   );
      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '800px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        title={
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <h1 style={{ margin: 0, color: '#1890ff' }}>Employee Onboarding</h1>
            <p style={{ margin: '10px 0 0 0', color: '#666' }}>
              Please complete the following steps to set up your profile
            </p>
          </div>
        }
      >
        {phase === 'welcome' && (
          <Welcome onStart={handleStart} />
        )}
        {phase === 'form' && (
          <>
            <Steps current={current} style={{ marginBottom: '30px' }}>
              {steps.slice(0, steps.length - 1).map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div style={{ minHeight: '400px', padding: '20px 0' }}>
              {renderStepContent()}
            </div>
            {current > 0 && current < steps.length - 2 && (
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Button style={{ margin: '0 8px' }} onClick={prev}>
                  Previous
                </Button>
              </div>
            )}
          </>
        )}
        {phase === 'complete' && (
          <CompleteResult onFinish={handleComplete} />
        )}
      </Card>
    </div>
  );
};

export default OnboardingPage;
