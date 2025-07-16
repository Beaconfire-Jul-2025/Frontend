export interface ContactFormProps {
  form: import('antd').FormInstance;
  initialValues?: {
    email: string;
    phone: string;
    alternatePhone?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
  };
  disabled?: boolean;
}

