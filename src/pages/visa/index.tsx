import { PageContainer } from '@ant-design/pro-components';
import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import WorkAuthorizationSection from '@/components/Section/WorkAuthorizationSection';
import { getEmployeeProfile } from '@/services/hr-backend/profile';

const VisaPage: React.FC = () => {
  const [workAuthorization, setWorkAuthorization] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEmployeeProfile()
      .then((data) => {
        setWorkAuthorization(data.workAuthorization);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load work authorization');
        setLoading(false);
      });
  }, []);

  return (
    <PageContainer>
      {loading && <Spin size="large" />}
      {error && <Alert type="error" message={error} />}
      {workAuthorization && (
        <WorkAuthorizationSection
          workAuthorization={workAuthorization}
          editable={false}
        />
      )}
    </PageContainer>
  );
};

export default VisaPage;
