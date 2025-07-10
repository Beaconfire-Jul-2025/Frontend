import type { UploadFile } from "antd/es/upload/interface";
import { Dayjs } from "dayjs";

export interface BasicInfoFormData {
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  PreferredName?: string;
  Email: string;
  CellPhone: string;
  AlternatePhone?: string;
  Gender: string;
  SSN: string;
  DOB?: Dayjs;
  avatar?: UploadFile[];
  CurrentAddress: {
    AddressLine1: string;
    AddressLine2?: string;
    City: string;
    State: string;
    ZipCode: string;
  };
  ID?: string;
  UserID?: string;
  ApplicationType?: string;
  Contact?: Contact[];
  Address?: Address[];
  VisaStatus?: VisaStatus[];
  PersonalDocument?: PersonalDocument[];
}

export interface OnboardingData {
  ID?: string;
  UserID?: string;
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  PreferredName?: string;
  Email?: string;
  CellPhone?: string;
  AlternatePhone?: string;
  Gender?: string;
  SSN?: string;
  DOB?: string;
  StartDate?: string;
  EndDate?: string;
  DriverLicense?: string;
  DriverLicenseExpiration?: string;
  HouseID?: string;
  Contact?: Contact[];
  Address?: Address[];
  VisaStatus?: VisaStatus[];
  PersonalDocument?: PersonalDocument[];
  ApplicationType?: string;
}

export interface Contact {
  ID: string;
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  CellPhone: string;
  AlternatePhone: string;
  Email: string;
  Relationship: string;
  Type: "EMERGENCY" | "REFERENCE";
}

export interface Address {
  ID: string;
  AddressLine1: string;
  AddressLine2?: string;
  City: string;
  State: string;
  ZipCode: string;
}

export interface VisaStatus {
  ID: string;
  VisaType: string;
  ActiveFlag: boolean;
  StartDate: string;
  EndDate: string;
  LastModificationDate: string;
}

export interface PersonalDocument {
  ID: string;
  Path: string;
  Title: string;
  Comment: string;
  CreateDate: string;
}
