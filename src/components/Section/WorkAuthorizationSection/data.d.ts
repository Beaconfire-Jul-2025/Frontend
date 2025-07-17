export interface WorkAuthorization {
  isUsCitizen: boolean;
  greenCardHolder: boolean;
  type: string;
  startDate: string | null;
  endDate: string | null;
  lastModificationDate?: string;
}

export interface WorkAuthorizationSectionProps {
  workAuthorization: WorkAuthorization;
  editable?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: (data: WorkAuthorization) => void;
  onCancel?: () => void;
}
