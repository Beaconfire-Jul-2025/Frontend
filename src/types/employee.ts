import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";

export interface FormData {
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  PreferredName?: string;
  AvatarPath?: string;
  Email?: string;
  CellPhone?: string;
  WorkPhone?: string;
  Gender?: string;
  SSN?: string;
  DOB?: string | Dayjs;
  Addresses?: Address[];
  WorkAuthorization?: WorkAuthorization;
  DriverLicense?: DriverLicense;
  EmergencyContacts?: EmergencyContact[];
  References?: Reference[];
  PersonalDocuments?: PersonalDocument[]; // Includes driver's license file
  ApplicationType?: string;
}

export interface Address {
  Type: string;
  AddressLine1: string;
  AddressLine2?: string;
  City: string;
  State: string;
  ZipCode: string;
}

export interface WorkAuthorization {
  IsUSCitizen: boolean;
  GreenCardHolder: boolean;
  Type: string;
  OtherType?: string; // For when Type is "Other"
  StartDate?: string | Dayjs;
  EndDate?: string | Dayjs;
  LastModificationDate: string | Dayjs;
}

export interface DriverLicense {
  HasLicense: boolean;
  LicenseNumber?: string;
  ExpirationDate?: string | Dayjs;
}

export interface PersonalDocument {
  Type: string;
  Path?: string;
  Title: string;
  Comment?: string;
  CreateDate?: string | Dayjs;
  File?: UploadFile;
}

export interface EmergencyContact {
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  CellPhone: string;
  AlternatePhone?: string;
  Email: string;
  Relationship: string;
  Address: Address;
}

export interface Reference {
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  Phone: string;
  Email: string;
  Relationship: string;
  Address: Address;
}

export interface OnboardingData {
  ID?: string;
  UserID?: string;
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  PreferredName?: string;
  AvatarPath?: string;
  Email?: string;
  CellPhone?: string;
  WorkPhone?: string;
  Gender?: string;
  SSN?: string;
  DOB?: string;
  StartDate?: string;
  EndDate?: string;
  HouseID?: string;
  Addresses?: Address[];
  WorkAuthorization?: WorkAuthorization;
  DriverLicense?: DriverLicense;
  EmergencyContacts?: EmergencyContact[];
  References?: Reference[];
  PersonalDocuments?: PersonalDocument[];
  ApplicationType?: string;
}
