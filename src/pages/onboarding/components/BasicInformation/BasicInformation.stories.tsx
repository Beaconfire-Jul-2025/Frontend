import React from 'react';
import BasicInformation, { BasicInformationValues } from './index';
import { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof BasicInformation> = {
  title: 'Onboarding/BasicInformation',
  component: BasicInformation,
};
export default meta;

type Story = StoryObj<typeof BasicInformation>;

const exampleInitialValues: BasicInformationValues = {
  name: {
    firstName: 'Jane',
    lastName: 'Doe',
    middleName: 'A.',
    suffix: '',
  },
  contact: {
    email: 'jane.doe@example.com',
    phone: '+1 234 567 8901',
    alternatePhone: '+1 234 567 8902',
  },
  identity: {
    ssn: '123-45-6789',
    dob: '1990-01-01',
    nationality: 'US',
    gender: 'female',
  },
};

export const Default: Story = {
  render: (args) => {
    return (
      <BasicInformation {...args} onFinish={() => {}} onCancel={() => {}} />
    );
  },
};

export const WithInitialValues: Story = {
  render: (args) => {
    return (
      <BasicInformation {...args} initialValues={exampleInitialValues} onFinish={() => {}} onCancel={() => {}} />
    );
  },
};

