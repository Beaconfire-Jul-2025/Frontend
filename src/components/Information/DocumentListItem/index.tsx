import { FileOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import React from 'react';
import type { PersonalDocument } from '../../Section/PersonalDocumentsSection/data';

const { Text } = Typography;

export interface DocumentListItemProps {
  doc: PersonalDocument;
  onPreview?: (doc: PersonalDocument) => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'PASSPORT':
      return <FileOutlined style={{ color: '#1890ff' }} />;
    case 'DRIVER_LICENSE':
      return <FileOutlined style={{ color: '#52c41a' }} />;
    case 'VISA':
      return <FileOutlined style={{ color: '#faad14' }} />;
    case 'PERSONAL_DOCUMENTS':
      return <FileOutlined style={{ color: '#eb2f96' }} />;
    default:
      return <FileOutlined />;
  }
};

export const DocumentListItem: React.FC<DocumentListItemProps> = ({
  doc,
  onPreview,
}) => (
  <List.Item
    actions={[
      <Button type="link" key="preview" onClick={() => onPreview?.(doc)}>
        Preview
      </Button>,
      <Button
        type="link"
        key="download"
        href={doc.path}
        target="_blank"
        download
      >
        Download
      </Button>,
    ]}
  >
    <List.Item.Meta
      avatar={getFileIcon(doc.type)}
      title={<Text strong>{doc.title}</Text>}
      description={doc.comment}
    />
    <Text type="secondary">{doc.createDate}</Text>
  </List.Item>
);

export default DocumentListItem;
