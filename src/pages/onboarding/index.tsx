import { StepsForm } from '@ant-design/pro-form';
import { message } from 'antd';
import React, { useState } from 'react';
import CompleteResult from '@/components/Form/CompleteResult';
import AddressInformation from './components/AddressInformation';
import BasicInformation from './components/BasicInformation';
import EmergencyContactInformation from './components/EmergencyContactInformation';
import ReferenceInformation from './components/ReferenceInformation';
import Welcome from './components/Welcome';
import WorkAuthorizationInformation from './components/WorkAuthorizationInformation';

let history: typeof import('@umijs/max').history;
if (process.env.STORYBOOK === 'true') {
  history = {
    push: () => {},
  } as any;
} else {
  history = require('@umijs/max').history;
}

interface OnboardingData {
  basicInfo?: any;
  addressInfo?: any;
  emergencyContacts?: any[];
  references?: any[];
}

const OnboardingPage: React.FC = () => {
  const [phase, setPhase] = useState<'welcome' | 'form' | 'complete'>(
    'welcome',
  );
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const _steps = [
    {
      title: 'Basic Information',
      form: (
        <BasicInformation
          onFinish={(values: any) => {
            setOnboardingData((prev) => ({ ...prev, basicInfo: values }));
            message.success('Basic information saved successfully!');
            return true;
          }}
          initialValues={onboardingData.basicInfo}
          onCancel={() => history.push('/welcome')}
        />
      ),
    },
    {
      title: 'Address Information',
      form: (
        <AddressInformation
          onFinish={(values: any) => {
            setOnboardingData((prev) => ({ ...prev, addressInfo: values }));
            message.success('Address information saved successfully!');
            return true;
          }}
          initialValues={onboardingData.addressInfo}
          onCancel={() => history.push('/welcome')}
        />
      ),
    },
    {
      title: 'Work Authorization Information',
      form: <WorkAuthorizationInformation />,
    },
    {
      title: 'Emergency Contact',
      form: (
        <EmergencyContactInformation
          onFinish={(contacts: any[]) => {
            setOnboardingData((prev) => ({
              ...prev,
              emergencyContacts: contacts,
            }));
            localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
            message.success('Emergency contacts saved successfully!');
            return true;
          }}
          initialValues={onboardingData.emergencyContacts}
          disabled={false}
        />
      ),
    },
    {
      title: 'Reference',
      form: (
        <ReferenceInformation
          onFinish={(refs: any[]) => {
            setOnboardingData((prev) => ({ ...prev, references: refs }));
            localStorage.setItem('references', JSON.stringify(refs));
            message.success('References saved successfully!');
            return true;
          }}
          initialValues={onboardingData.references}
          disabled={false}
        />
      ),
    },
  ];

  const submitToCompositeService = async (data: any) => {
    // Transform onboardingData to required JSON structure
    const {
      basicInfo = {},
      addressInfo = {},
      workAuthorization = {},
      emergencyContacts = [],
      references = [],
      personalDocuments = [],
    } = data;

    // Example mapping, adjust as needed based on actual form data structure
    const result = {
      firstName: basicInfo.name?.firstName || '',
      lastName: basicInfo.name?.lastName || '',
      middleName: basicInfo.name?.middleName || '',
      preferredName: basicInfo.name?.preferredName || '',
      avatarPath: basicInfo.identity?.avatarPath || '',
      email: basicInfo.contact?.email || '',
      cellPhone: basicInfo.contact?.cellPhone || '',
      alternatePhone: basicInfo.contact?.alternatePhone || '',
      gender: basicInfo.identity?.gender || '',
      ssn: basicInfo.identity?.ssn || '',
      dob: basicInfo.identity?.dob ? new Date(basicInfo.identity.dob) : null,
      addresses: addressInfo.addresses || [],
      workAuthorization: workAuthorization || {},
      driverLicense: basicInfo.identity?.driverLicense || {},
      emergencyContacts: emergencyContacts || [],
      references: references || [],
      personalDocuments: personalDocuments || [],
      applicationType: 'ONBOARD',
    };

    // TODO: Replace with actual API call to composite service
    // await fetch('/api/composite', { method: 'POST', body: JSON.stringify(result) });
    console.log('Submitting to composite service:', result);
  };

  if (phase === 'welcome') {
    return <Welcome onStart={() => setPhase('form')} />;
  }

  if (phase === 'complete') {
    return <CompleteResult onFinish={() => history.push('/welcome')} />;
  }

  return (
    <div style={{ minHeight: '80vh' }}>
      <StepsForm
        stepsProps={{
          direction: 'vertical',
          style: { width: 220, marginRight: 32 },
        }}
        onFinish={async () => {
          message.success('Onboarding completed successfully!');
          setPhase('complete');
          await submitToCompositeService({
            ...onboardingData,
            workAuthorization: onboardingData.workAuthorization,
            personalDocuments: onboardingData.personalDocuments,
          });
          return true;
        }}
      >
        <StepsForm.StepForm
          name="basicInfo"
          title="Basic Information"
          initialValues={onboardingData.basicInfo}
          onFinish={async (values) => {
            setOnboardingData((prev) => ({ ...prev, basicInfo: values }));
            message.success('Basic information saved successfully!');
            return true;
          }}
        >
          <BasicInformation onCancel={() => history.push('/welcome')} />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="addressInfo"
          title="Address Information"
          initialValues={onboardingData.addressInfo}
          onFinish={async (values) => {
            setOnboardingData((prev) => ({ ...prev, addressInfo: values }));
            message.success('Address information saved successfully!');
            return true;
          }}
        >
          <AddressInformation onCancel={() => history.push('/welcome')} />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="workAuthorization"
          title="Work Authorization Information"
        >
          <WorkAuthorizationInformation />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="emergencyContacts"
          title="Emergency Contact"
          initialValues={onboardingData.emergencyContacts}
          onFinish={async (contacts) => {
            setOnboardingData((prev) => ({
              ...prev,
              emergencyContacts: contacts,
            }));
            localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
            message.success('Emergency contacts saved successfully!');
            return true;
          }}
        >
          <EmergencyContactInformation disabled={false} />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="references"
          title="Reference"
          initialValues={onboardingData.references}
          onFinish={async (refs) => {
            setOnboardingData((prev) => ({ ...prev, references: refs }));
            localStorage.setItem('references', JSON.stringify(refs));
            message.success('References saved successfully!');
            return true;
          }}
        >
          <ReferenceInformation disabled={false} />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};

export default OnboardingPage;
