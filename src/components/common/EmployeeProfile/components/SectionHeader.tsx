import React from "react";
import { Button, Space } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

interface SectionHeaderProps {
  canEdit: boolean;
  isEditing: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  canEdit,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  if (!canEdit) return null;

  if (isEditing) {
    return (
      <Space>
        <Button type="primary" icon={<SaveOutlined />} onClick={onSave}>
          Save
        </Button>
        <Button icon={<CloseOutlined />} onClick={onCancel}>
          Cancel
        </Button>
      </Space>
    );
  }

  return (
    <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
      Edit
    </Button>
  );
};
