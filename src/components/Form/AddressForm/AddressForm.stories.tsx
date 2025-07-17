import React from 'react';
import {Button, Form, message, Space} from 'antd';
import AddressForm from './index';

// Mock Storybook types for development
interface Meta<T = any> {
  title: string;
  component: React.ComponentType<T>;
  parameters?: any;
  argTypes?: any;
}

interface StoryObj<T = any> {
  render?: (args: T) => React.ReactElement;
  args?: Partial<T>;
}

const meta: Meta<typeof AddressForm> = {
  title: 'Form/AddressForm',
  component: AddressForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    showAddressType: {
      control: 'boolean',
      description: 'Whether to show the address type field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the form is disabled',
    },
    maxAddresses: {
      control: {type: 'number', min: 1, max: 10},
      description: 'Maximum number of addresses allowed',
    },
  },
};

export default meta;
type Story = StoryObj<React.ComponentProps<typeof AddressForm>>;

const sampleAddress = {
  addressLine1: '123 Main St',
  addressLine2: 'Apt 4B',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  type: 'PRIMARY',
};

interface FormWrapperProps {
  children: React.ReactElement;
  onSubmit?: (values: any) => void;
  initialValues?: any;
}

const FormWrapper: React.FC<FormWrapperProps> = ({children, onSubmit, initialValues}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      message.success('Form submitted successfully!');
      onSubmit?.(values);
      console.log('Form values:', values);
    } catch (error) {
      message.error('Please fix validation errors');
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('Form reset');
  };

  return (
    <Form form={form} initialValues={initialValues} layout="vertical">
      <div style={{maxWidth: 800, margin: '0 auto'}}>
        {React.cloneElement(children, {form})}
        <Space style={{marginTop: 16}}>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export const Default: Story = {
  render: (args: React.ComponentProps<typeof AddressForm>) => (
    <FormWrapper initialValues={args.initialValues}>
      <AddressForm {...args} />
    </FormWrapper>
  ),
  args: {
    initialValues: {
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        type: 'PRIMARY'
      }
    },
    showAddressType: true,
    disabled: false,
    maxAddresses: 1,
  },
};

export const WithInitialData: Story = {
  render: (args: React.ComponentProps<typeof AddressForm>) => (
    <FormWrapper initialValues={args.initialValues}>
      <AddressForm {...args} />
    </FormWrapper>
  ),
  args: {
    initialValues: {address: sampleAddress},
    showAddressType: true,
    disabled: false,
    maxAddresses: 1,
  },
};

export const WithoutAddressType: Story = {
  render: (args: React.ComponentProps<typeof AddressForm>) => (
    <FormWrapper initialValues={args.initialValues}>
      <AddressForm {...args} />
    </FormWrapper>
  ),
  args: {
    initialValues: {address: sampleAddress},
    showAddressType: false,
    disabled: false,
    maxAddresses: 1,
  },
};

export const Disabled: Story = {
  render: (args: React.ComponentProps<typeof AddressForm>) => (
    <FormWrapper initialValues={args.initialValues}>
      <AddressForm {...args} />
    </FormWrapper>
  ),
  args: {
    initialValues: {address: sampleAddress},
    showAddressType: true,
    disabled: true,
    maxAddresses: 1,
  },
};

export const SingleAddressNoType: Story = {
  render: (args: React.ComponentProps<typeof AddressForm>) => (
    <FormWrapper initialValues={args.initialValues}>
      <AddressForm {...args} />
    </FormWrapper>
  ),
  args: {
    initialValues: {
      address: {
        addressLine1: '321 Pine St',
        addressLine2: 'Suite 100',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        type: 'PRIMARY'
      }
    },
    showAddressType: false,
    disabled: false,
    maxAddresses: 1,
  },
};
