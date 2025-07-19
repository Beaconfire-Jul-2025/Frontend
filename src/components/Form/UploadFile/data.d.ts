export type FilePurpose = 'AVATAR' | 'DRIVER_LICENSE' | 'VISA' | 'PERSONAL_DOC';

export interface UploadFileProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  fileLimit?: number;
  purpose: FilePurpose;
  disabled?: boolean;
}

export interface PreSignedRequest {
  filePurpose: string;
  fileType: string;
}

export interface PreSignedResponse {
  presignedUrl: string;
  objectKey: string;
}
