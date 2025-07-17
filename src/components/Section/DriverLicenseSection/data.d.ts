import type { DriverLicenseFormValues } from '../../Form/DriverLicenseForm/data.d';
import type { PersonalDocument } from '../PersonalDocumentsSection/data.d';

export interface DriverLicenseSectionProps {
  driverLicense?: DriverLicenseFormValues;
  document?: PersonalDocument;
  editable?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: (values: DriverLicenseFormValues) => void;
  onCancel?: () => void;
}
