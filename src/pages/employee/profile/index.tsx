import { PageContainer } from '@ant-design/pro-components';
import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import EmployeeProfile from '@/components/EmployeeProfile';
import { getEmployeePersonalProfile } from '@/services/hr-backend/employee';

const EmployeeProfilePage: React.FC = () => {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEmployeePersonalProfile()
      .then((res) => {
        if (res.success) {
          setEmployee(res.data);
        } else {
          setError(res.errorMessage || 'Failed to load employee profile');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load employee profile');
        setLoading(false);
      });
  }, []);

  return (
    <PageContainer>
      {loading && <Spin size="large" />}
      {error && <Alert type="error" message={error} />}
      {employee && <EmployeeProfile employee={employee} editable={true} />}
    </PageContainer>
  );
};

export default EmployeeProfilePage;
