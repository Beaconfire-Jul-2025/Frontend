export interface PersonalDocument {
  type: string;
  path: string;
  title: string;
  comment?: string;
  createDate: string;
}

export interface PersonalDocumentsSectionProps {
  documents: PersonalDocument[];
  editable?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: (docs: PersonalDocument[]) => void;
  onCancel?: () => void;
}
