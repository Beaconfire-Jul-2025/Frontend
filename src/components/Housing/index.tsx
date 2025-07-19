import { useLocation } from '@umijs/max';
import React from 'react';
import { EmployeeHousingView } from './components/EmployeeHousingView';
import { HRHousingView } from './components/HRHousingView';

const Housing: React.FC = () => {
  const location = useLocation();
  const isHRView = location.pathname.startsWith('/hr/housing');
  return isHRView ? <HRHousingView /> : <EmployeeHousingView />;
};

export default Housing;
