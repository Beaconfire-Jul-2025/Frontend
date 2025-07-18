import React, { useEffect, useState } from 'react';
import EmployeeTable from '@/components/EmployeeTable';
import type { Employee } from '@/components/EmployeeTable/data';
import { getEmployeeProfiles } from '@/services/hr-backend/employee';

const EmployeesPage: React.FC = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const res = await getEmployeeProfiles({ page: page - 1, size });
      setData(res.list || []);
      setTotal(res.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(current, pageSize);
  }, [current, pageSize]);

  return (
    <EmployeeTable
      view="profile"
      data={data}
      loading={loading}
      total={total}
      pagination={{
        current,
        pageSize,
        onChange: (page, size) => {
          setCurrent(page);
          setPageSize(size || 10);
        },
      }}
    />
  );
};

export default EmployeesPage;
