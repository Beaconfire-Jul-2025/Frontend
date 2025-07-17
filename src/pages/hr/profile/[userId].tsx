import { useParams } from '@umijs/max';
import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import EmployeeProfile from '@/components/EmployeeProfile';
import { fetchEmployees } from '@/services/hr-backend/composite';

const EmployeeProfileHRView: React.FC = () => {
  const { userId } = useParams();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchEmployees({ userId });
        if (res.success && res.data.list.length > 0) {
          setEmployee(res.data.list[0]);
        } else {
          setError('Employee not found');
        }
      } catch (e: any) {
        setError(e.message || 'Failed to fetch employee');
      }
      setLoading(false);
    };
    fetchData();
  }, [userId]);

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;
  if (!employee) return null;

  return <EmployeeProfile employee={employee} editable={false} />;
};

export default EmployeeProfileHRView;
