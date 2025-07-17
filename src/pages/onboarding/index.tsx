import React, { useState } from 'react';
import { Steps, Button, Card, message } from 'antd';
import { history } from '@umijs/max';
import BasicInformation from './components/BasicInformation';
import AddressInformation from './components/AddressInformation';
import Welcome from './components/Welcome';
import CompleteResult from '@/components/Form/CompleteResult';
import type { NameData } from '@/components/Form/NameForm/data';

const { Step } = Steps;

interface OnboardingData {
  basicInfo?: any;
  addressInfo?: any;
}

const OnboardingPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<'welcome' | 'form' | 'complete'>('welcome');
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const steps = [
    {
      title: 'Basic Information',
      content: 'basic-information',
    },
    {
      title: 'Address Information',
      content: 'address-information',
    },
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

  const handleBasicInfoSubmit = (values: any) => {
    setOnboardingData(prev => ({ ...prev, basicInfo: values }));
    message.success('Basic information saved successfully!');
    next();
  };

  const handleAddressInfoSubmit = (values: any) => {
    setOnboardingData(prev => ({ ...prev, addressInfo: values }));
    message.success('Address information saved successfully!');
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
          <BasicInformation
            initialValues={onboardingData.basicInfo}
            onFinish={handleBasicInfoSubmit}
            onCancel={() => history.push('/welcome')}
          />
        );
      case 1:
        return (
          <AddressInformation
            initialValues={onboardingData.addressInfo}
            onFinish={handleAddressInfoSubmit}
            onCancel={() => history.push('/welcome')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1000px',
          gap: '40px',
        }}
      >
        {/* Steps on the left */}
        {phase === 'form' && (
          <div
            style={{
              minWidth: '220px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              padding: '32px 16px',
              height: 'fit-content',
              alignSelf: 'flex-start',
            }}
          >
            <Steps
              direction="vertical"
              current={current}
              style={{}}
            >
              {steps.slice(0, steps.length - 1).map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
        )}
        {/* Card on the right */}
        <Card
          style={{
            width: '100%',
            maxWidth: '800px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
          {phase === 'welcome' && <Welcome onStart={handleStart} />}
          {phase === 'form' && (
            <>
              {/* Steps removed from here */}
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
          {phase === 'complete' && <CompleteResult onFinish={handleComplete} />}
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
