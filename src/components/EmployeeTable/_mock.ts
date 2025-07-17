import type { EmployeeListResponse } from './data';

const mockEmployees: EmployeeListResponse = {
  success: true,
  data: {
    list: [
      {
        applicationId: 'visaApp789',
        userId: 'emp123',
        fullName: 'Zack Smith',
        preferredName: 'Zack',
        email: 'zack@example.com',
        applicationType: 'VISA',
        applicationStatus: 'IN_REVIEW',
        visaType: 'OPT STEM',
        visaExpirationDate: '2026-05-30',
        daysLeft: 314,
        lastModifiedDate: '2025-07-16T18:22:00Z',
        avatarPath: '/avatars/zack.png',
        ssnMasked: 'XXX-XX-1234',
        startDate: '2025-07-01',
        phone: '123-456-7890',
        createDate: '2025-07-10T12:00:00Z',
      },
    ],
    current: 1,
    pageSize: 10,
    total: 35,
  },
};

export default [
  {
    url: '/api/composite/employees',
    method: 'get',
    response: () => mockEmployees,
  },
];
