import { Card, Form } from 'antd';
import React from 'react';
import ContactForm from '@/components/Form/ContactForm';
import type { ContactFormProps } from '@/components/Form/ContactForm/data';
import IdentityForm from '@/components/Form/IdentityForm';
import type { IdentityInfo } from '@/components/Form/IdentityForm/data';
import { NameForm } from '@/components/Form/NameForm';
import type { NameData } from '@/components/Form/NameForm/data';

export interface BasicInformationValues {
  name: NameData;
  contact: ContactFormProps['initialValues'];
  identity: IdentityInfo;
}

interface BasicInformationProps {
  initialValues?: Partial<BasicInformationValues>;
  onFinish: (values: BasicInformationValues) => void;
  onCancel: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  initialValues,
  onFinish,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onFinish(values as BasicInformationValues);
  };

  return (
    <>
      <Card title="Name Information" style={{ marginBottom: 24 }}>
        <Form.Item noStyle shouldUpdate>
          {() => <NameForm />}
        </Form.Item>
      </Card>
      <Card title="Contact Information" style={{ marginBottom: 24 }}>
        <Form.Item noStyle shouldUpdate>
          {() => <ContactForm />}
        </Form.Item>
      </Card>
      <Card title="Identity Information" style={{ marginBottom: 24 }}>
        <Form.Item noStyle shouldUpdate>
          {() => <IdentityForm />}
        </Form.Item>
      </Card>
    </>
  );
};

export default BasicInformation;
