export type ViewMode = "roommate" | "employee" | "hr";

export interface EmployeeProfileProps {
  employeeId?: string;
  employee?: any; // Will use the Employee type from types/employee.ts
  mode: ViewMode;
  onUpdate?: () => void;
}

export interface SectionProps {
  employee: any;
  mode: ViewMode;
  onEdit?: (section: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export type EditSection =
  | "name"
  | "identity"
  | "address"
  | "contact"
  | "employment"
  | "driverLicense"
  | null;
