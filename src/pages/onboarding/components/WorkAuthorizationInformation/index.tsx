import { Card } from 'antd';
import React, { useState } from 'react';
import { CitizenshipQuestions } from '@/components/Form/WorkAuthorization/CitizenshipQuestions';
import { WorkAuthorizationNonCitizen } from '@/components/Form/WorkAuthorization/WorkAuthorizationNonCitizen';
import type { WorkAuthorizationData } from './data.d';

const WorkAuthorizationInformation: React.FC<{
  value?: WorkAuthorizationData;
  onChange?: (data: WorkAuthorizationData) => void;
}> = ({
  value = {
    isUsCitizen: false,
    greenCardHolder: false,
    type: '',
    startDate: null,
    endDate: null,
    lastModificationDate: new Date().toISOString().slice(0, 10),
  },
  onChange,
}) => {
  const [localData, setLocalData] = useState<WorkAuthorizationData>(value);

  const handleCitizenshipChange = (data: any) => {
    const wa = data.workAuthorization;
    const updated = {
      ...localData,
      isUsCitizen: wa.isUsCitizen,
      greenCardHolder: wa.greenCardHolder,
      type: wa.type,
      startDate: wa.startDate,
      endDate: wa.endDate,
      lastModificationDate: wa.lastModificationDate,
    };
    setLocalData(updated);
    onChange?.(updated);
  };

  const handleNonCitizenChange = (data: any) => {
    const updated = { ...localData, nonCitizenData: data };
    setLocalData(updated);
    onChange?.(updated);
  };

  return (
    <Card title="Work Authorization Information">
      <CitizenshipQuestions
        value={{ workAuthorization: localData }}
        onChange={handleCitizenshipChange}
      />
      {!localData.isUsCitizen && !localData.greenCardHolder && (
        <WorkAuthorizationNonCitizen
          value={localData.nonCitizenData}
          onChange={handleNonCitizenChange}
        />
      )}
    </Card>
  );
};

export default WorkAuthorizationInformation;
