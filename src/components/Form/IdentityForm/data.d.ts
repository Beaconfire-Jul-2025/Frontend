export interface IdentityFormProps {
  value?: IdentityInfo;
  onChange?: (values: IdentityInfo) => void;
}

export interface IdentityInfo {
  ssn: string;
  gender: string;
  dob: string;
}
export interface IdentitySectionProps {
  value: IdentityInfo;
  mode?: 'employee' | 'admin';
  isEditing: boolean;
  onEdit?: () => void;
  onSave?: (values: IdentityInfo) => void;
  onCancel?: () => void;
  form: any;
}

export interface IdentityInfo {
  ssn: string;
  gender: string;
  dob: string;
}

