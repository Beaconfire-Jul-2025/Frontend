import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { CitizenshipQuestions } from "./index";
import FormWrapper from "../../FormWrapper";
import type { CitizenshipQuestionsData } from "./data.d";

const meta: Meta<typeof CitizenshipQuestions> = {
  title: "Form/WorkAuthorization/CitizenshipQuestions",
  component: CitizenshipQuestions,
};
export default meta;

type Story = StoryObj<typeof CitizenshipQuestions>;

const initialValues: CitizenshipQuestionsData = {
  isUSCitizen: null,
  isGreenCardHolder: null,
};

export const Default: Story = {
  render: () => {
    const [formData, setFormData] = useState<CitizenshipQuestionsData>(initialValues);
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

