import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { OPTSTEMProcess } from "./index";
import FormWrapper from "../../FormWrapper";
import type { OPTSTEMProcessData } from "./data.d";

const meta: Meta<typeof OPTSTEMProcess> = {
  title: "Form/WorkAuthorization/OPTSTEMProcess",
  component: OPTSTEMProcess,
};
export default meta;

type Story = StoryObj<typeof OPTSTEMProcess>;

const initialValues: OPTSTEMProcessData = {
  i20File: undefined,
  optStemReceipt: undefined,
  optStemEAD: undefined,
};

export const Default: Story = {
  render: () => {
    const [formData, setFormData] = useState<OPTSTEMProcessData>(initialValues);
    // Simulate step logic for storybook
    const canShowNextOPTStep = (step: string) => {
      if (step === "I20") return !!formData.i20File;
      if (step === "OPT_STEM_RECEIPT") return !!formData.optStemReceipt;
      if (step === "OPT_STEM_EAD") return !!formData.optStemEAD;
      return false;
    };
    return (
      <FormWrapper
        initialValues={formData}
        onFinish={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        <OPTSTEMProcess
          value={formData}
          onChange={setFormData}
          onDownloadI983={() => alert("Download I-983 Form")}
          canShowNextOPTStep={canShowNextOPTStep}
        />
      </FormWrapper>
    );
  },
};

