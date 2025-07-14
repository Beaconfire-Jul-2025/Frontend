export interface Address {
  type: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface WorkAuthorization {
  isUsCitizen: boolean;
  greenCardHolder: boolean;
  type: string;
  startDate: string | null;
  endDate: string | null;
  lastModificationDate: string;
}

export interface DriverLicense {
  hasLicense: boolean;
  licenseNumber: string;
  expirationDate: string;
}

export interface EmergencyContact {
  firstName: string;
  lastName: string;
  middleName?: string;
  cellPhone: string;
  alternatePhone?: string;
  email: string;
  relationship: string;
  address: Address;
}

export interface Reference {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
  address: Address;
}

export interface PersonalDocument {
  type: string;
  path: string;
  title: string;
  comment: string;
  createDate: string;
}

export interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  avatarPath?: string;
  email: string;
  cellPhone: string;
  workPhone?: string;
  gender: string;
  ssn: string;
  dob: string;
  startDate: string;
  endDate?: string;
  houseId: string;
  addresses: Address[];
  workAuthorization: WorkAuthorization;
  driverLicense: DriverLicense;
  emergencyContacts: EmergencyContact[];
  references: Reference[];
  personalDocuments: PersonalDocument[];
  applicationType: string;
}
