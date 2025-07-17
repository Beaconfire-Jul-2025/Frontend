import { Card, Typography } from 'antd';
import React, { useState } from 'react';
import { OPTSTEMProcess } from './WorkAuthorization/OPTSTEMProcess';
import type { OPTSTEMProcessData } from './WorkAuthorization/OPTSTEMProcess/data.d';
import { WorkAuthorizationNonCitizen } from './WorkAuthorization/WorkAuthorizationNonCitizen';

const { Title } = Typography;

const VisaUpdateForm: React.FC = () => {
  const [optStemData, setOptStemData] = useState<OPTSTEMProcessData>({});

  // Helper to determine which step to show next
  const canShowNextOPTStep = (step: string) => {
    if (step === 'I20') return !!optStemData.i20File;
    if (step === 'OPT_STEM_RECEIPT') return !!optStemData.optStemReceipt;
    if (step === 'OPT_STEM_EAD') return !!optStemData.optStemEAD;
    return false;
  };

  const handleDownloadI983 = () => {
    // Implement download logic here
    window.open(
      'https://www.uscis.gov/sites/default/files/document/forms/i-983.pdf',
      '_blank',
    );
  };

  return (
    <Card className="mb-6">
      <Title level={3} className="mb-4">
        Visa Update Form
      </Title>
      <WorkAuthorizationNonCitizen />
      <OPTSTEMProcess
        value={optStemData}
        onChange={setOptStemData}
        onDownloadI983={handleDownloadI983}
        canShowNextOPTStep={canShowNextOPTStep}
      />
    </Card>
  );
};

export default VisaUpdateForm;
