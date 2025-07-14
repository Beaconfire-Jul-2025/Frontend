import React from "react";
import {
  ProFormSelect,
  ProFormRadio,
  ProFormText,
  ProFormDatePicker,
} from "@ant-design/pro-components";
import { Upload, Button, Card, Typography, Space, Alert } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useVisaForm } from "@/hooks/useVisaForm.ts";
import type { FormData } from "@/types/employee.ts";

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface VisaFormProps {
  initialValues?: FormData;
}

export const WorkAuthorization: React.FC<VisaFormProps> = ({
  initialValues,
}) => {
  const {
    isUSCitizen,
    workAuthType,
    handleCitizenshipChange,
    handleWorkAuthTypeChange,
    handleFileUpload,
    handleI983Download,
    canShowNextOPTStep,
  } = useVisaForm(initialValues);

  const workAuthOptions = [
    { label: "H1-B", value: "H1-B" },
    { label: "L2", value: "L2" },
    { label: "F1(CPT/OPT)", value: "F1(CPT/OPT)" },
    { label: "H4", value: "H4" },
    { label: "Other", value: "Other" },
  ];

  const citizenshipOptions = [
    { label: "Yes, I am a U.S. Citizen or Permanent Resident", value: true },
    { label: "No, I require work authorization", value: false },
  ];

  const disableFutureDates = (current: dayjs.Dayjs): boolean => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <div className="max-w-4xl">
      <Title level={3} className="mb-6">
        Work Authorization Information
      </Title>

      {/* Citizenship Question */}
      <ProFormRadio.Group
        name={["WorkAuthorization", "IsUSCitizen"]}
        label="Are you a citizen or permanent resident of the U.S.? *"
        options={citizenshipOptions}
        rules={[
          { required: true, message: "Please select your citizenship status" },
        ]}
        fieldProps={{
          onChange: handleCitizenshipChange,
        }}
        className="mb-6"
      />

      {/* Green Card or Citizen Selection */}
      {isUSCitizen && (
        <ProFormRadio.Group
          name={["WorkAuthorization", "GreenCardHolder"]}
          label="Please specify your status *"
          options={[
            { label: "U.S. Citizen", value: false },
            { label: "Green Card Holder", value: true },
          ]}
          rules={[{ required: true, message: "Please select your status" }]}
          className="mb-6"
        />
      )}

      {/* Work Authorization for Non-Citizens */}
      {isUSCitizen === false && (
        <>
          <ProFormSelect
            name={["WorkAuthorization", "Type"]}
            label="What is your work authorization? *"
            placeholder="Select your work authorization type"
            options={workAuthOptions}
            rules={[
              {
                required: true,
                message: "Please select your work authorization type",
              },
            ]}
            fieldProps={{
              onChange: handleWorkAuthTypeChange,
            }}
            className="mb-4"
          />

          {/* Other Work Authorization Input */}
          {workAuthType === "Other" && (
            <ProFormText
              name={["WorkAuthorization", "OtherType"]}
              label="Please specify your work authorization *"
              placeholder="Enter your work authorization type"
              rules={[
                {
                  required: true,
                  message: "Please specify your work authorization",
                },
              ]}
              className="mb-4"
            />
          )}

          {/* Start and End Dates */}
          {workAuthType && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ProFormDatePicker
                name={["WorkAuthorization", "StartDate"]}
                label="Start Date *"
                placeholder="Select start date"
                rules={[
                  { required: true, message: "Please select the start date" },
                ]}
                fieldProps={{
                  format: "MM/DD/YYYY",
                  disabledDate: disableFutureDates,
                }}
              />

              <ProFormDatePicker
                name={["WorkAuthorization", "EndDate"]}
                label="End Date *"
                placeholder="Select end date"
                rules={[
                  { required: true, message: "Please select the end date" },
                ]}
                fieldProps={{
                  format: "MM/DD/YYYY",
                }}
              />
            </div>
          )}

          {/* Work Authorization Document Upload */}
          {workAuthType && (
            <Card className="mb-6">
              <Title level={4} className="mb-4">
                Work Authorization Document *
              </Title>
              <Text className="block mb-4">
                Please upload a copy of your work authorization document (EAD
                card, H1B document, etc.)
              </Text>
              <Dragger
                name="workAuthFile"
                multiple={false}
                accept=".pdf,.jpg,.jpeg,.png"
                beforeUpload={() => false}
                onChange={(info) =>
                  handleFileUpload(info, "WORK_AUTHORIZATION_PROOF")
                }
                className="mb-4"
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
            </Card>
          )}

          {/* OPT STEM Process for F1 Students */}
          {workAuthType === "F1(CPT/OPT)" && (
            <Card className="mb-6">
              <Title level={4} className="mb-4">
                OPT STEM Application Process
              </Title>
              <Alert
                message="International students must use OPT/OPT STEM to work in the U.S."
                type="info"
                className="mb-4"
              />

              {/* Step 1: Download I-983 */}
              <div className="mb-6">
                <Space direction="vertical" size="small" className="w-full">
                  <Text strong>Step 1: Download and Complete I-983 Form</Text>
                  <Text type="secondary">
                    Download the I-983 form that needs to be filled for OPT STEM
                  </Text>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={handleI983Download}
                  >
                    Download I-983 Form
                  </Button>
                </Space>
              </div>

              {/* Step 2: Upload I-20 */}
              <div className="mb-6">
                <Space direction="vertical" size="small" className="w-full">
                  <Text strong>Step 2: Upload New I-20</Text>
                  <Text type="secondary">
                    After submitting the I-983 to your school, upload your new
                    I-20
                  </Text>
                  <Dragger
                    name="i20File"
                    multiple={false}
                    accept=".pdf"
                    beforeUpload={() => false}
                    onChange={(info) => handleFileUpload(info, "I20")}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Upload New I-20</p>
                    <p className="ant-upload-hint">PDF files only</p>
                  </Dragger>
                </Space>
              </div>

              {/* Step 3: Upload OPT STEM Receipt */}
              {canShowNextOPTStep("I20") && (
                <div className="mb-6">
                  <Space direction="vertical" size="small" className="w-full">
                    <Alert
                      message="Please upload your OPT STEM Receipt"
                      type="success"
                      className="mb-2"
                    />
                    <Text type="secondary">
                      Upload your OPT STEM Receipt (applied for OPT STEM but
                      haven't received the EAD yet)
                    </Text>
                    <Dragger
                      name="optReceiptFile"
                      multiple={false}
                      accept=".pdf"
                      beforeUpload={() => false}
                      onChange={(info) =>
                        handleFileUpload(info, "OPT_STEM_RECEIPT")
                      }
                    >
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">Upload OPT STEM Receipt</p>
                      <p className="ant-upload-hint">PDF files only</p>
                    </Dragger>
                  </Space>
                </div>
              )}

              {/* Step 4: Upload OPT STEM EAD */}
              {canShowNextOPTStep("OPT_STEM_RECEIPT") && (
                <div className="mb-6">
                  <Space direction="vertical" size="small" className="w-full">
                    <Alert
                      message="Please upload your OPT STEM EAD"
                      type="success"
                      className="mb-2"
                    />
                    <Text type="secondary">
                      Upload your OPT STEM EAD (received the OPT EAD) and wait
                      for HR's response
                    </Text>
                    <Dragger
                      name="optEADFile"
                      multiple={false}
                      accept=".pdf"
                      beforeUpload={() => false}
                      onChange={(info) =>
                        handleFileUpload(info, "OPT_STEM_EAD")
                      }
                    >
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">Upload OPT STEM EAD</p>
                      <p className="ant-upload-hint">PDF files only</p>
                    </Dragger>
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
          )}
        </>
      )}
    </div>
  );
};
