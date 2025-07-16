import React, { useCallback } from 'react';
import { Upload, message } from 'antd';
import type { UploadProps, UploadFile as AntdUploadFile } from 'antd/es/upload/interface';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFileProps, FilePurpose } from './data';

// Conditional import for Storybook compatibility
let getPreSignedUrl: typeof import('./service').getPreSignedUrl;
if (process.env.STORYBOOK === 'true') {
  getPreSignedUrl = require('./service.storybook').getPreSignedUrl;
} else {
  getPreSignedUrl = require('./service').getPreSignedUrl;
}

const { Dragger } = Upload;

const UploadFile: React.FC<UploadFileProps> = ({
  value,
  onChange,
  fileLimit = 1,
  purpose,
  disabled,
}) => {
  // Convert value to fileList for AntD
  const fileList: AntdUploadFile[] = React.useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((v, idx) => ({
        uid: String(idx),
        name: v.split('/').pop() || 'file',
        status: 'done',
        url: v,
      }));
    }
    return [{
      uid: '0',
      name: value.split('/').pop() || 'file',
      status: 'done',
      url: value,
    }];
  }, [value]);

  // Custom upload handler
  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const fileType = (file as File).type;
      const { presignedUrl, objectKey } = await getPreSignedUrl({
        fileType,
        filePurpose: purpose,
      });
      // Upload to S3
      await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': fileType,
        },
      });
      if (onChange) {
        if (fileLimit === 1) {
          onChange(objectKey);
        } else {
          const prev = Array.isArray(value) ? value : value ? [value] : [];
          onChange([...prev, objectKey].slice(-fileLimit));
        }
      }
      if (onSuccess) onSuccess({}, file as any);
      message.success('File uploaded successfully');
    } catch (e) {
      if (onError) onError(e as any);
      message.error('File upload failed');
    }
  };

  // Remove file handler
  const handleRemove = useCallback((file: AntdUploadFile) => {
    if (onChange) {
      if (fileLimit === 1) {
        onChange(undefined);
      } else {
        const prev = Array.isArray(value) ? value : value ? [value] : [];
        onChange(prev.filter((v) => v !== file.url && v !== file.response?.objectKey));
      }
    }
    return true;
  }, [onChange, value, fileLimit]);

  return (
    <Dragger
      name="file"
      multiple={fileLimit > 1}
      fileList={fileList}
      customRequest={customRequest}
      onRemove={handleRemove}
      disabled={disabled}
      maxCount={fileLimit}
      accept={purpose === 'AVATAR' ? 'image/*' : undefined}
      showUploadList={{ showRemoveIcon: !disabled }}
      beforeUpload={(file) => {
        if (fileLimit === 1 && fileList.length >= 1) {
          message.warning('Only one file can be uploaded');
          return Upload.LIST_IGNORE;
        }
        return true;
      }}
      style={{ width: '100%' }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        {fileLimit === 1 ? 'Only one file allowed.' : `Up to ${fileLimit} files allowed.`}
      </p>
    </Dragger>
  );
};

export default UploadFile;
