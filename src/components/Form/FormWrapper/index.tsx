import React from 'react';
import { Form } from 'antd';

export interface FormWrapperProps {
  initialValues?: any;
  onFinish?: (values: any) => void;
  formId?: string;
  children: React.ReactNode;
  formInstance?: any;
  layout?: 'vertical' | 'horizontal' | 'inline';
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  initialValues,
  onFinish,
  formId = 'form-wrapper',
  children,
  formInstance,
  layout = 'vertical',
}) => {
  return (
    <Form
      id={formId}
      form={formInstance}
      layout={layout}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      {children}
    </Form>
  );
};

export default FormWrapper;

