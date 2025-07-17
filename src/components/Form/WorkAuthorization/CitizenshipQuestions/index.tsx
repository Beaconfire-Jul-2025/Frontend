import React from "react";
import { ProFormRadio } from "@ant-design/pro-components";
import type { CitizenshipQuestionsData } from "./data.d";

interface CitizenshipQuestionsProps {
  value?: CitizenshipQuestionsData;
  onChange?: (data: CitizenshipQuestionsData) => void;
}

const citizenshipOptions = [
  { label: "Yes, I am a U.S. Citizen or Permanent Resident", value: true },
  { label: "No, I require work authorization", value: false },
];

const greenCardOptions = [
  { label: "U.S. Citizen", value: false },
  { label: "Green Card Holder", value: true },
];

export const CitizenshipQuestions: React.FC<CitizenshipQuestionsProps> = ({
  value = { isUSCitizen: null, isGreenCardHolder: null },
  onChange,
}) => {
  return (
    <>
      <ProFormRadio.Group
        name="isUSCitizen"
        label="Are you a citizen or permanent resident of the U.S.? *"
        options={citizenshipOptions}
        rules={[{ required: true, message: "Please select your citizenship status" }]}
        fieldProps={{
          value: value.isUSCitizen,
          onChange: (e) => {
            const isUSCitizen = e.target.value;
            onChange?.({ ...value, isUSCitizen, isGreenCardHolder: null });
          },
        }}
        className="mb-6"
      />
      {value.isUSCitizen === true && (
        <ProFormRadio.Group
          name="isGreenCardHolder"
          label="Please specify your status *"
          options={greenCardOptions}
          rules={[{ required: true, message: "Please select your status" }]}
          fieldProps={{
            value: value.isGreenCardHolder,
            onChange: (e) => {
              onChange?.({ ...value, isGreenCardHolder: e.target.value });
            },
          }}
          className="mb-6"
        />
      )}
    </>
  );
};

