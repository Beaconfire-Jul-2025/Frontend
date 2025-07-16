import type { PreSignedRequest, PreSignedResponse } from './data';

export default [
  {
    url: '/api/pre-signed',
    method: 'post',
    response: (req: { body: PreSignedRequest }) => {
      const { filePurpose, fileType } = req.body;
      const ext = fileType.split('/')[1] || 'jpg';
      const objectKey = `temp/${filePurpose.toLowerCase()}-${Date.now()}.${ext}`;
      return {
        presignedUrl: `https://your-bucket.s3.amazonaws.com/${objectKey}?AWSAccessKeyId=...&Signature=...&Expires=...`,
        objectKey,
      };
    },
  },
];

