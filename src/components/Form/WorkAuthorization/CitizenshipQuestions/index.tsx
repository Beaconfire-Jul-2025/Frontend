import { ProFormRadio } from '@ant-design/pro-components';
import React from 'react';
import type { CitizenshipQuestionsData } from './data.d';

interface CitizenshipQuestionsProps {
  value?: CitizenshipQuestionsData;
  onChange?: (data: CitizenshipQuestionsData) => void;
}

const yesNoOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const CitizenshipQuestions: React.FC<CitizenshipQuestionsProps> = ({
  value = {
    workAuthorization: {
      isUsCitizen: false,
      greenCardHolder: false,
      type: '',
      startDate: null,
      endDate: null,
      lastModificationDate: new Date().toISOString().slice(0, 10),
    },
  },
  onChange,
}) => {
  const handleCitizenChange = (isUsCitizen: boolean) => {
    const type = isUsCitizen ? 'US Citizen' : '';
    onChange?.({
      workAuthorization: {
        ...value.workAuthorization,
        isUsCitizen,
        greenCardHolder: false,
        type,
      },
    });
  };

  const handleGreenCardChange = (greenCardHolder: boolean) => {
    const type = greenCardHolder
      ? 'Green Card Holder'
      : value.workAuthorization.isUsCitizen
        ? 'US Citizen'
        : 'Other';
    onChange?.({
      workAuthorization: {
        ...value.workAuthorization,
        greenCardHolder,
        type,
      },
    });
  };

  return (
    <>
      <ProFormRadio.Group
        name="isUsCitizen"
        label="Are you a US citizen? *"
        options={yesNoOptions}
        rules={[
          { required: true, message: 'Please select your citizenship status' },
        ]}
        fieldProps={{
          value: value.workAuthorization.isUsCitizen,
          onChange: (e: any) => handleCitizenChange(e.target.value),
        }}
        className="mb-6"
      />
      {!value.workAuthorization.isUsCitizen && (
        <ProFormRadio.Group
          name="greenCardHolder"
          label="Are you a green card holder? *"
          options={yesNoOptions}
          rules={[
            { required: true, message: 'Please select your green card status' },
          ]}
          fieldProps={{
            value: value.workAuthorization.greenCardHolder,
            onChange: (e: any) => handleGreenCardChange(e.target.value),
          }}
          className="mb-6"
        />
      )}
    </>
  );
};
