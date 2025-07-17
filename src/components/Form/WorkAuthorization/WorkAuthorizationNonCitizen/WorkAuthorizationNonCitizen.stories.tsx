import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { WorkAuthorizationNonCitizen } from "./index";
import FormWrapper from "../../FormWrapper";
import type { WorkAuthorizationNonCitizenData } from "./data.d";

const meta: Meta<typeof WorkAuthorizationNonCitizen> = {
  title: "Form/WorkAuthorization/WorkAuthorizationNonCitizen",
  component: WorkAuthorizationNonCitizen,
};
export default meta;

type Story = StoryObj<typeof WorkAuthorizationNonCitizen>;

const initialValues: WorkAuthorizationNonCitizenData = {
  workAuthType: "",
  otherType: "",
  startDate: undefined,
  endDate: undefined,
  workAuthFile: undefined,
};

export const Default: Story = {
  render: () => {
    const [formData, setFormData] = useState<WorkAuthorizationNonCitizenData>(initialValues);
    return (
      <FormWrapper
        initialValues={formData}
        onFinish={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        <WorkAuthorizationNonCitizen value={formData} onChange={setFormData} />
      </FormWrapper>
    );
  },
};

