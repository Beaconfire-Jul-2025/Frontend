import { DownloadOutlined } from '@ant-design/icons';
import { StepsForm } from '@ant-design/pro-components';
import { Alert, Button, Card, message, Space, Typography } from 'antd';
import React, { useState } from 'react';
import UploadFile from '@/components/Form/UploadFile';
import type { OPTSTEMProcessData } from '@/components/Form/WorkAuthorization/OPTSTEMProcess/data';
import { WorkAuthorizationNonCitizen } from '@/components/Form/WorkAuthorization/WorkAuthorizationNonCitizen';
import type { WorkAuthorizationNonCitizenData } from '@/components/Form/WorkAuthorization/WorkAuthorizationNonCitizen/data.d';

const { Title, Text } = Typography;

interface VisaApplicationData {
  workAuthorization: {
    isUsCitizen: boolean;
    greenCardHolder: boolean;
    type: string;
    startDate: string | null;
    endDate: string | null;
    lastModificationDate: Date;
  };
  personalDocuments: Array<{
    type: string;
    path: string;
    title: string;
    comment: string;
    createDate: Date;
  }>;
}

const VisaUpdatePage: React.FC = () => {
  const [workAuthData, setWorkAuthData] =
    useState<WorkAuthorizationNonCitizenData>({
      workAuthType: '',
    });
  const [optStemData, setOptStemData] = useState<OPTSTEMProcessData>({});
  const [submitting, setSubmitting] = useState(false);

  const isF1 = workAuthData.workAuthType === 'F1(CPT/OPT)';

  const handleDownloadI983 = () => {
    window.open('https://www.ice.gov/doclib/sevis/pdf/i983.pdf', '_blank');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Prepare the data structure for API
      const applicationData: VisaApplicationData = {
        workAuthorization: {
          isUsCitizen: false,
          greenCardHolder: false,
          type:
            workAuthData.workAuthType === 'Other'
              ? workAuthData.otherType || ''
              : workAuthData.workAuthType,
          startDate: workAuthData.startDate || null,
          endDate: workAuthData.endDate || null,
          lastModificationDate: new Date(),
        },
        personalDocuments: [],
      };

      // Add work authorization document if it exists
      if (workAuthData.workAuthFile) {
        applicationData.personalDocuments.push({
          type: 'VISA',
          path: `/documents/visa/${workAuthData.workAuthFile.name}`,
          title: 'Work Authorization Document',
          comment: `${workAuthData.workAuthType} authorization document`,
          createDate: new Date(),
        });
      }

      // Add F1 OPT STEM documents if they exist
      if (isF1) {
        if (optStemData.i20File) {
          applicationData.personalDocuments.push({
            type: 'VISA',
            path: `/documents/visa/${optStemData.i20File.name}`,
            title: 'I-20 Document',
            comment: 'Updated I-20 for OPT STEM',
            createDate: new Date(),
          });
        }
        if (optStemData.optStemReceipt) {
          applicationData.personalDocuments.push({
            type: 'VISA',
            path: `/documents/visa/${optStemData.optStemReceipt.name}`,
            title: 'OPT STEM Receipt',
            comment: 'OPT STEM application receipt',
            createDate: new Date(),
          });
        }
        if (optStemData.optStemEAD) {
          applicationData.personalDocuments.push({
            type: 'VISA',
            path: `/documents/visa/${optStemData.optStemEAD.name}`,
            title: 'OPT STEM EAD',
            comment: 'OPT STEM Employment Authorization Document',
            createDate: new Date(),
          });
        }
      }

      // await postVisaApplication(applicationData);
      message.success('Visa application submitted successfully!');

      // Reset form data
      setWorkAuthData({ workAuthType: '' });
      setOptStemData({});
    } catch (error) {
      console.error('Error submitting visa application:', error);
      message.error('Failed to submit visa application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // For non-F1 visa types, show simple form
  if (!isF1 && workAuthData.workAuthType) {
    return (
      <Card className="mb-6">
        <Title level={3} className="mb-4">
          Visa Update Form
        </Title>
        <WorkAuthorizationNonCitizen
          value={workAuthData}
          onChange={setWorkAuthData}
          showDocumentUpload={true}
        />
        <div className="mt-6 text-center">
          <Button
            type="primary"
            size="large"
            loading={submitting}
            onClick={handleSubmit}
            disabled={
              !workAuthData.workAuthFile ||
              !workAuthData.startDate ||
              !workAuthData.endDate
            }
          >
            Submit Visa Application
          </Button>
        </div>
      </Card>
    );
  }

  // For F1 visa types, show step form
  return (
    <Card className="mb-6">
      <Title level={3} className="mb-4">
        Visa Update Form
      </Title>

      <StepsForm
        onFinish={handleSubmit}
        stepsProps={{
          direction: 'vertical',
          size: 'small',
        }}
        submitter={{
          render: (props) => {
            return [
              <Button key="prev" onClick={props.onPre}>
                Previous
              </Button>,
              <Button
                key="next"
                type="primary"
                loading={submitting}
                onClick={props.onSubmit}
              >
                {props.step === 4 ? 'Submit Application' : 'Next'}
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm
          name="workAuth"
          title="Work Authorization"
          onFinish={async () => {
            return true;
          }}
        >
          <WorkAuthorizationNonCitizen
            value={workAuthData}
            onChange={setWorkAuthData}
            showDocumentUpload={false}
          />
          {!workAuthData.workAuthType && (
            <div className="text-center mt-4">
              <Typography.Text type="secondary">
                Please select your work authorization type to continue
              </Typography.Text>
            </div>
          )}
        </StepsForm.StepForm>

        {isF1 && (
          <>
            <StepsForm.StepForm
              name="downloadI983"
              title="Download I-983 Form"
              onFinish={async () => {
                return true;
              }}
            >
              <Alert
                message="International students must use OPT/OPT STEM to work in the U.S."
                type="info"
                className="mb-4"
              />
              <Space direction="vertical" size="large" className="w-full">
                <div>
                  <Text strong>Step 1: Download and Complete I-983 Form</Text>
                  <br />
                  <Text type="secondary">
                    Download the I-983 form that needs to be filled for OPT STEM
                  </Text>
                </div>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadI983}
                  size="large"
                >
                  Download I-983 Form
                </Button>
              </Space>
            </StepsForm.StepForm>

            <StepsForm.StepForm
              name="uploadI20"
              title="Upload New I-20"
              onFinish={async () => {
                return !!optStemData.i20File;
              }}
            >
              <Space direction="vertical" size="large" className="w-full">
                <div>
                  <Text strong>Step 2: Upload New I-20</Text>
                  <br />
                  <Text type="secondary">
                    After submitting the I-983 to your school, upload your new
                    I-20
                  </Text>
                </div>
                <UploadFile
                  value={optStemData.i20File}
                  onChange={(file) =>
                    setOptStemData({ ...optStemData, i20File: file })
                  }
                  fileLimit={1}
                  purpose="VISA"
                  disabled={false}
                />
              </Space>
            </StepsForm.StepForm>

            <StepsForm.StepForm
              name="uploadOptStemReceipt"
              title="Upload OPT STEM Receipt"
              onFinish={async () => {
                return !!optStemData.optStemReceipt;
              }}
            >
              <Space direction="vertical" size="large" className="w-full">
                <Alert
                  message="Please upload your OPT STEM Receipt"
                  type="success"
                  className="mb-2"
                />
                <div>
                  <Text strong>Step 3: Upload OPT STEM Receipt</Text>
                  <br />
                  <Text type="secondary">
                    Upload your OPT STEM Receipt (applied for OPT STEM but
                    haven't received the EAD yet)
                  </Text>
                </div>
                <UploadFile
                  value={optStemData.optStemReceipt}
                  onChange={(file) =>
                    setOptStemData({ ...optStemData, optStemReceipt: file })
                  }
                  fileLimit={1}
                  purpose="VISA"
                  disabled={false}
                />
              </Space>
            </StepsForm.StepForm>

            <StepsForm.StepForm
              name="uploadOptStemEAD"
              title="Upload OPT STEM EAD"
              onFinish={async () => {
                return !!optStemData.optStemEAD;
              }}
            >
              <Space direction="vertical" size="large" className="w-full">
                <Alert
                  message="Please upload your OPT STEM EAD"
                  type="success"
                  className="mb-2"
                />
                <div>
                  <Text strong>Step 4: Upload OPT STEM EAD</Text>
                  <br />
                  <Text type="secondary">
                    Upload your OPT STEM EAD (received the OPT EAD) and wait for
                    HR's response
                  </Text>
                </div>
                <UploadFile
                  value={optStemData.optStemEAD}
                  onChange={(file) =>
                    setOptStemData({ ...optStemData, optStemEAD: file })
                  }
                  fileLimit={1}
                  purpose="VISA"
                  disabled={false}
                />
                {optStemData.optStemEAD && (
                  <Alert
                    message="All documents uploaded successfully!"
                    description="A confirmation email will be sent to your email with information on the next steps. Please wait for HR's response."
                    type="success"
                    showIcon
                  />
                )}
              </Space>
            </StepsForm.StepForm>
          </>
        )}
      </StepsForm>
    </Card>
  );
};

export default VisaUpdatePage;
