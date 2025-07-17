import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import FormWrapper from '../../FormWrapper';
import type { CitizenshipQuestionsData } from './data.d';
import { CitizenshipQuestions } from './index';

const meta: Meta<typeof CitizenshipQuestions> = {
  title: 'Form/WorkAuthorization/CitizenshipQuestions',
  component: CitizenshipQuestions,
};
export default meta;

type Story = StoryObj<typeof CitizenshipQuestions>;

const initialValues: CitizenshipQuestionsData = {
  workAuthorization: {
    isUsCitizen: false,
    greenCardHolder: false,
    type: '',
    startDate: null,
    endDate: null,
    lastModificationDate: new Date().toISOString().slice(0, 10),
  },
};

export const Default: Story = {
  render: () => {
    const [formData, setFormData] =
      useState<CitizenshipQuestionsData>(initialValues);
    return (
      <FormWrapper
        initialValues={formData}
        onFinish={(values) => {
          // For Storybook, just log the values
          alert(JSON.stringify(values));
        }}
      >
        <CitizenshipQuestions value={formData} onChange={setFormData} />
      </FormWrapper>
    );
  },
};
