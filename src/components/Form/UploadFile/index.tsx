import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type {
  UploadFile as AntdUploadFile,
  UploadProps,
} from 'antd/es/upload/interface';
import React, { useCallback } from 'react';
import type { UploadFileProps } from './data';

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
        name: v.split('/').pop() ?? 'file',
        status: 'done',
        url: v,
      }));
    }
    return [
      {
        uid: '0',
        name: value.split('/').pop() ?? 'file',
        status: 'done',
        url: value,
      },
    ];
  }, [value]);

  // Custom upload handler
  const customRequest: UploadProps['customRequest'] = ({
    file,
    onSuccess,
    onError,
  }) => {
    (async () => {
      try {
        const fileType = (file as File).type;
        const { objectKey } = await getPreSignedUrl({
          fileType,
          filePurpose: purpose,
        });
        // Simulate successful upload (skip actual S3 upload)
        if (onChange) {
          let prev: string[];
          if (Array.isArray(value)) {
            prev = value;
          } else if (value) {
            prev = [value];
          } else {
            prev = [];
          }
          if (fileLimit === 1) {
            onChange(objectKey);
          } else {
            onChange([...prev, objectKey].slice(-fileLimit));
          }
        }
        if (onSuccess) onSuccess({}, file as any);
        message.success('File uploaded successfully');
      } catch (e) {
        if (onError) onError(e as any);
        message.error('File upload failed');
      }
    })();
  };

  // Remove file handler
  const handleRemove = useCallback(
    (file: AntdUploadFile) => {
      if (onChange) {
        let prev: string[];
        if (Array.isArray(value)) {
          prev = value;
        } else if (value) {
          prev = [value];
        } else {
          prev = [];
        }
        if (fileLimit === 1) {
          onChange('');
        } else {
          onChange(
            prev.filter(
              (v) => v !== file.url && v !== file.response?.objectKey,
            ),
          );
        }
      }
      return true;
    },
    [onChange, value, fileLimit],
  );

  return (
    <Dragger
      name="file"
      multiple={fileLimit > 1}
      fileList={fileList}
      customRequest={customRequest}
      onRemove={handleRemove}
      disabled={disabled}
      maxCount={fileLimit}
      accept={purpose === 'AVATAR' ? 'image/*' : '.pdf,.jpg,.jpeg,.png'}
      showUploadList={{ showRemoveIcon: !disabled }}
      beforeUpload={(_file) => {
        if (fileLimit === 1 && fileList.length >= 1) {
          message.warning('Only one file can be uploaded');
          return Upload.LIST_IGNORE;
        }
        return true;
      }}
      style={{ width: '100%' }}
    >
      <p className="ant-upload-drag-icon">
        <UploadOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for PDF, JPG, JPEG, PNG files only
      </p>
    </Dragger>
  );
};

export default UploadFile;
