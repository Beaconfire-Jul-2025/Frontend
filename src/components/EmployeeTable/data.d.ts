export interface Employee {
  userId: string;
  fullName: string;
  preferredName?: string;
  email: string;
  avatarPath?: string;
  // Visa/Work Auth fields
  applicationId?: string;
  applicationType?: string;
  applicationStatus?: string;
  visaType?: string;
  visaExpirationDate?: string;
  daysLeft?: number;
  lastModifiedDate?: string;
  // Onboarding fields
  createDate?: string;
  ssnMasked?: string;
  startDate?: string;
  phone?: string;
}

export interface EmployeeListResponse {
  success: boolean;
  data: {
    list: Employee[];
    current: number;
    pageSize: number;
    total: number;
  };
}

export type EmployeeTableView =
  | 'visa'
  | 'application'
  | 'profile'
  | 'roommate'
  | 'hiring';
