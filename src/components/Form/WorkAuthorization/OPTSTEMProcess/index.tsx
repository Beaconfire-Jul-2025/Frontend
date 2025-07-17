import React from "react";
import { Card, Typography, Space, Button, Alert } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import UploadFile from "../../UploadFile";
import type { OPTSTEMProcessData } from "./data.d";

const { Title, Text } = Typography;

interface OPTSTEMProcessProps {
  value?: OPTSTEMProcessData;
  onChange?: (data: OPTSTEMProcessData) => void;
  onDownloadI983?: () => void;
  canShowNextOPTStep?: (step: string) => boolean;
}

export const OPTSTEMProcess: React.FC<OPTSTEMProcessProps> = ({
  value = {},
  onChange,
  onDownloadI983,
  canShowNextOPTStep = () => false,
}) => {
  return (
    <Card className="mb-6">
      <Title level={4} className="mb-4">OPT STEM Application Process</Title>
      <Alert message="International students must use OPT/OPT STEM to work in the U.S." type="info" className="mb-4" />
      {/* Step 1: Download I-983 */}
      <div className="mb-6">
        <Space direction="vertical" size="small" className="w-full">
          <Text strong>Step 1: Download and Complete I-983 Form</Text>
          <Text type="secondary">Download the I-983 form that needs to be filled for OPT STEM</Text>
          <Button type="primary" icon={<DownloadOutlined />} onClick={onDownloadI983}>Download I-983 Form</Button>
        </Space>
      </div>
      {/* Step 2: Upload New I-20 */}
      <div className="mb-6">
        <Space direction="vertical" size="small" className="w-full">
          <Text strong>Step 2: Upload New I-20</Text>
          <Text type="secondary">After submitting the I-983 to your school, upload your new I-20</Text>
          <UploadFile
            value={value.i20File}
            onChange={(file) => onChange?.({ ...value, i20File: file })}
            fileLimit={1}
            purpose="VISA"
            disabled={false}
          />
        </Space>
      </div>
      {/* Step 3: Upload OPT STEM Receipt */}
      {canShowNextOPTStep("I20") && (
        <div className="mb-6">
          <Space direction="vertical" size="small" className="w-full">
            <Alert message="Please upload your OPT STEM Receipt" type="success" className="mb-2" />
            <Text type="secondary">Upload your OPT STEM Receipt (applied for OPT STEM but haven't received the EAD yet)</Text>
            <UploadFile
              value={value.optStemReceipt}
              onChange={(file) => onChange?.({ ...value, optStemReceipt: file })}
              fileLimit={1}
              purpose="VISA"
              disabled={false}
            />
          </Space>
        </div>
      )}
      {/* Step 4: Upload OPT STEM EAD */}
      {canShowNextOPTStep("OPT_STEM_RECEIPT") && (
        <div className="mb-6">
          <Space direction="vertical" size="small" className="w-full">
            <Alert message="Please upload your OPT STEM EAD" type="success" className="mb-2" />
            <Text type="secondary">Upload your OPT STEM EAD (received the OPT EAD) and wait for HR's response</Text>
            <UploadFile
              value={value.optStemEAD}
              onChange={(file) => onChange?.({ ...value, optStemEAD: file })}
              fileLimit={1}
              purpose="VISA"
              disabled={false}
            />
          </Space>
        </div>
      )}
      {/* Completion Message */}
      {canShowNextOPTStep("OPT_STEM_EAD") && (
        <Alert
          message="All documents uploaded successfully!"
          description="A confirmation email will be sent to your email with information on the next steps. Please wait for HR's response."
          type="success"
          showIcon
        />
      )}
    </Card>
  );
};
