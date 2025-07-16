import React, {useCallback, useState} from 'react';
import {Form, message, Space, Typography} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import {ProCard} from '@ant-design/pro-components';
import {AddressDisplay} from '@/components/Information/AddressDisplay';
import {SectionHeader} from '@/components/Section/SectionHeader';
import AddressForm from '@/components/Form/AddressForm';
import type {Address} from '@/components/Information/AddressDisplay/data.d';
import type {AddressFormData, AddressSectionProps} from './data.d';

const {Title} = Typography;

export const AddressSection: React.FC<AddressSectionProps> = ({
                                                                addresses = [],
                                                                loading = false,
                                                                editable = true,
                                                                onEdit,
                                                                onSave,
                                                                onCancel,
                                                              }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [form] = Form.useForm<AddressFormData>();

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit();
    }

    // Populate form with existing addresses or create empty one
    const formAddresses = addresses.length > 0 ? addresses : [{
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      type: 'PRIMARY'
    }];

    form.setFieldsValue({
      addresses: formAddresses
    });

    setIsEditing(true);
  }, [form, addresses, onEdit]);

  const handleSave = useCallback(async () => {
    try {
      setSaveLoading(true);
      const values = await form.validateFields();

      // Filter out empty addresses
      const validAddresses = values.addresses.filter((addr: Address) =>
        addr.addressLine1?.trim() && addr.city?.trim() && addr.state?.trim() && addr.zipCode?.trim()
      );

      if (onSave) {
        await onSave(validAddresses);
      }

      setIsEditing(false);
      message.success('Address information updated successfully');
    } catch (error) {
      console.error('Error saving addresses:', error);
      message.error('Failed to save address information');
    } finally {
      setSaveLoading(false);
    }
  }, [form, onSave]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }

    form.resetFields();
    setIsEditing(false);
  }, [form, onCancel]);

  return (
    <ProCard
      title={
        <Space>
          <HomeOutlined/>
          <Title level={4} style={{margin: 0}}>
            Address Information
          </Title>
        </Space>
      }
      extra={
        <SectionHeader
          canEdit={editable}
          isEditing={isEditing}
          loading={saveLoading || loading}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      }
      loading={loading && !isEditing}
      bordered
      size="small"
    >
      {isEditing ? (
        <AddressForm form={form}/>
      ) : (
        <Space direction="vertical" size="middle" style={{width: '100%'}}>
          {addresses.length === 0 ? (
            <Typography.Text type="secondary">
              No address information available
            </Typography.Text>
          ) : (
            addresses.map((address, index) => (
              <AddressDisplay key={index} address={address}/>
            ))
          )}
        </Space>
      )}
    </ProCard>
  );
};

export default AddressSection;
