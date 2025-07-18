import { useParams } from '@umijs/max';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import EmployeeProfile from '@/components/EmployeeProfile';
import { getEmployeeProfileById } from '@/services/hr-backend/employee';

const EmployeeProfileViewer: React.FC = () => {
  const { userId } = useParams();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getEmployeeProfileById(userId)
      .then((data) => setEmployee(data))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading || !employee) {
    return <Spin />;
  }

  return <EmployeeProfile employee={employee} editable={false} />;
};

export default EmployeeProfileViewer;
