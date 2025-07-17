export interface DriverLicenseFormValues {
  hasLicense: boolean;
  licenseNumber?: string;
  expirationDate?: string;
}

export interface DriverLicenseFormProps {
  value?: DriverLicenseFormValues;
  onChange?: (values: DriverLicenseFormValues) => void;
  disabled?: boolean;
}
