import React from 'react';
import {Button, Form, Input, Select} from 'antd';
import type {FormInstance} from 'antd/es/form';

interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  type?: "PRIMARY" | "SECONDARY" | string;
}

interface AddressFormProps {
  form?: FormInstance;
  initialValues?: {
    addresses: Address[];
  };
  showAddressType?: boolean;
  disabled?: boolean;
  maxAddresses?: number;
}

const {Option} = Select;

const ADDRESS_TYPES = [
  {value: 'PRIMARY', label: 'Primary'},
  {value: 'SECONDARY', label: 'Secondary'},
  {value: 'BILLING', label: 'Billing'},
  {value: 'SHIPPING', label: 'Shipping'},
  {value: 'WORK', label: 'Work'},
  {value: 'OTHER', label: 'Other'},
];

const US_STATES = [
  {value: 'AL', label: 'Alabama'},
  {value: 'AK', label: 'Alaska'},
  {value: 'AZ', label: 'Arizona'},
  {value: 'AR', label: 'Arkansas'},
  {value: 'CA', label: 'California'},
  {value: 'CO', label: 'Colorado'},
  {value: 'CT', label: 'Connecticut'},
  {value: 'DE', label: 'Delaware'},
  {value: 'FL', label: 'Florida'},
  {value: 'GA', label: 'Georgia'},
  {value: 'HI', label: 'Hawaii'},
  {value: 'ID', label: 'Idaho'},
  {value: 'IL', label: 'Illinois'},
  {value: 'IN', label: 'Indiana'},
  {value: 'IA', label: 'Iowa'},
  {value: 'KS', label: 'Kansas'},
  {value: 'KY', label: 'Kentucky'},
  {value: 'LA', label: 'Louisiana'},
  {value: 'ME', label: 'Maine'},
  {value: 'MD', label: 'Maryland'},
  {value: 'MA', label: 'Massachusetts'},
  {value: 'MI', label: 'Michigan'},
  {value: 'MN', label: 'Minnesota'},
  {value: 'MS', label: 'Mississippi'},
  {value: 'MO', label: 'Missouri'},
  {value: 'MT', label: 'Montana'},
  {value: 'NE', label: 'Nebraska'},
  {value: 'NV', label: 'Nevada'},
  {value: 'NH', label: 'New Hampshire'},
  {value: 'NJ', label: 'New Jersey'},
  {value: 'NM', label: 'New Mexico'},
  {value: 'NY', label: 'New York'},
  {value: 'NC', label: 'North Carolina'},
  {value: 'ND', label: 'North Dakota'},
  {value: 'OH', label: 'Ohio'},
  {value: 'OK', label: 'Oklahoma'},
  {value: 'OR', label: 'Oregon'},
  {value: 'PA', label: 'Pennsylvania'},
  {value: 'RI', label: 'Rhode Island'},
  {value: 'SC', label: 'South Carolina'},
  {value: 'SD', label: 'South Dakota'},
  {value: 'TN', label: 'Tennessee'},
  {value: 'TX', label: 'Texas'},
  {value: 'UT', label: 'Utah'},
  {value: 'VT', label: 'Vermont'},
  {value: 'VA', label: 'Virginia'},
  {value: 'WA', label: 'Washington'},
  {value: 'WV', label: 'West Virginia'},
  {value: 'WI', label: 'Wisconsin'},
  {value: 'WY', label: 'Wyoming'},
];

const AddressForm: React.FC<{ name?: number; showAddressType?: boolean; disabled?: boolean }> = ({
  name,
  showAddressType = true,
  disabled = false,
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16
    }}>
      {showAddressType && (
        <Form.Item
          label="Address Type"
          name={name !== undefined ? [name, 'type'] : 'type'}
          rules={[{ required: true, message: 'Please select address type' }]}
        >
          <Select placeholder="Select address type" showSearch disabled={disabled}>
            {ADDRESS_TYPES.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        label="Address Line 1"
        name={name !== undefined ? [name, 'addressLine1'] : 'addressLine1'}
        rules={[
          { required: true, message: 'Please enter address line 1' },
          { max: 100, message: 'Address line 1 cannot exceed 100 characters' }
        ]}
        style={{ gridColumn: showAddressType ? 'auto' : 'span 2' }}
      >
        <Input placeholder="Enter street address" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Address Line 2 (Optional)"
        name={name !== undefined ? [name, 'addressLine2'] : 'addressLine2'}
        rules={[
          { max: 100, message: 'Address line 2 cannot exceed 100 characters' }
        ]}
      >
        <Input placeholder="Apartment, suite, unit, etc." disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="City"
        name={name !== undefined ? [name, 'city'] : 'city'}
        rules={[
          { required: true, message: 'Please enter city' },
          { max: 50, message: 'City cannot exceed 50 characters' }
        ]}
      >
        <Input placeholder="Enter city" disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="State"
        name={name !== undefined ? [name, 'state'] : 'state'}
        rules={[{ required: true, message: 'Please select state' }]}
      >
        <Select placeholder="Select state" showSearch disabled={disabled}>
          {US_STATES.map(state => (
            <Option key={state.value} value={state.value}>
              {state.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="ZIP Code"
        name={name !== undefined ? [name, 'zipCode'] : 'zipCode'}
        rules={[
          { required: true, message: 'Please enter ZIP code' },
          {
            pattern: /^\d{5}(-\d{4})?$/,
            message: 'Please enter a valid ZIP code (12345 or 12345-6789)'
          }
        ]}
      >
        <Input placeholder="12345 or 12345-6789" maxLength={10} disabled={disabled} />
      </Form.Item>
    </div>
  );
};

export default AddressForm;
