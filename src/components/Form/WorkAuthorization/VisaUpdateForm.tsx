import { Card, Typography } from 'antd';
import React, { useState } from 'react';
import { OPTSTEMProcess } from './OPTSTEMProcess';
import type { OPTSTEMProcessData } from './OPTSTEMProcess/data';
import { WorkAuthorizationNonCitizen } from './WorkAuthorizationNonCitizen';
import type { WorkAuthorizationNonCitizenData } from './WorkAuthorizationNonCitizen/data.d';

const { Title } = Typography;

const VisaUpdateForm: React.FC = () => {
  const [workAuthData, setWorkAuthData] =
    useState<WorkAuthorizationNonCitizenData>({ workAuthType: '' });
  const [optStemData, setOptStemData] = useState<OPTSTEMProcessData>({});

  // Helper to determine which step to show next
  const canShowNextOPTStep = (step: string) => {
    if (step === 'I20') return !!optStemData.i20File;
    if (step === 'OPT_STEM_RECEIPT') return !!optStemData.optStemReceipt;
    if (step === 'OPT_STEM_EAD') return !!optStemData.optStemEAD;
    return false;
  };

  const isF1 = workAuthData.workAuthType === 'F1(CPT/OPT)';

  return (
    <Card className="mb-6">
      <Title level={3} className="mb-4">
        Visa Update Form
      </Title>
      <WorkAuthorizationNonCitizen
        value={workAuthData}
        onChange={setWorkAuthData}
        showDocumentUpload={!isF1 && !!workAuthData.workAuthType}
      />
      {isF1 && (
        <OPTSTEMProcess
          value={optStemData}
          onChange={setOptStemData}
          canShowNextOPTStep={canShowNextOPTStep}
        />
      )}
    </Card>
  );
};

export default VisaUpdateForm;
