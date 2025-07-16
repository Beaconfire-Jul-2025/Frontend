import React from 'react';
import {Button, Space} from 'antd';
import {CloseOutlined, EditOutlined, SaveOutlined} from '@ant-design/icons';

interface SectionHeaderProps {
  canEdit: boolean;
  isEditing: boolean;
  loading?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
                                                              canEdit,
                                                              isEditing,
                                                              loading = false,
                                                              onEdit,
                                                              onSave,
                                                              onCancel,
                                                            }) => {
  if (!canEdit) return null;

  if (isEditing) {
    return (
      <Space>
        <Button
          type="primary"
          icon={<SaveOutlined/>}
          onClick={onSave}
          loading={loading}
        >
          Save
        </Button>
        <Button
          icon={<CloseOutlined/>}
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </Space>
    );
  }

  return (
    <Button
      type="primary"
      icon={<EditOutlined/>}
      onClick={onEdit}
      disabled={loading}
    >
      Edit
    </Button>
  );
};

export default SectionHeader;
