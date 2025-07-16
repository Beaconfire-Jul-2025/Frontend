export interface NameSectionData {
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
}

export interface NameSectionProps {
  data: NameSectionData;
  mode?: 'employee' | 'readonly';
  isEditing: boolean;
  onEdit?: () => void;
  onSave?: (values: NameSectionData) => void;
  onCancel?: () => void;
}

