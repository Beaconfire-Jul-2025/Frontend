import { FileOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { List, Modal, Space, Typography } from 'antd';
import React, { useState } from 'react';
import DocumentListItem from '../../Information/DocumentListItem';
import { SectionHeader } from '../SectionHeader';
import type { PersonalDocument, PersonalDocumentsSectionProps } from './data.d';

const { Text } = Typography;

const getFileIcon = (type: string) => {
  // You can expand this for more types
  switch (type) {
    case 'PASSPORT':
      return <FileOutlined style={{ color: '#1890ff' }} />;
    case 'DRIVER_LICENSE':
      return <FileOutlined style={{ color: '#52c41a' }} />;
    default:
      return <FileOutlined />;
  }
};

export const PersonalDocumentsSection: React.FC<
  PersonalDocumentsSectionProps
> = ({
  documents = [],
  editable = false,
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [previewDoc, setPreviewDoc] = useState<PersonalDocument | null>(null);

  // Safely handle null/undefined documents
  const safeDocuments = Array.isArray(documents) ? documents : [];

  // Sort documents by createDate descending
  const sortedDocs = [...safeDocuments].sort(
    (a, b) =>
      new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
  );

  return (
    <ProCard
      title={
        <Space>
          <FileOutlined />
          Documents
        </Space>
      }
      headerBordered
      extra={
        <SectionHeader
          canEdit={editable}
          isEditing={isEditing}
          onEdit={onEdit}
          onSave={onSave ? () => onSave(sortedDocs) : undefined}
          onCancel={onCancel}
        />
      }
    >
      {safeDocuments.length === 0 ? (
        <Typography.Text type="secondary">
          No personal documents available
        </Typography.Text>
      ) : (
        <List
          dataSource={sortedDocs}
          renderItem={(doc) => (
            <DocumentListItem
              key={doc.id}
              document={doc}
              onPreview={() => setPreviewDoc(doc)}
            />
          )}
        />
      )}
      <Modal
        open={!!previewDoc}
        title={previewDoc?.title}
        footer={null}
        onCancel={() => setPreviewDoc(null)}
        width={600}
      >
        {previewDoc && (
          <object
            data={previewDoc.path}
            type="application/pdf"
            width="100%"
            height="400px"
          >
            <p>
              Preview not available.{' '}
              <a
                href={previewDoc.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>{' '}
              instead.
            </p>
          </object>
        )}
      </Modal>
    </ProCard>
  );
};

export default PersonalDocumentsSection;
