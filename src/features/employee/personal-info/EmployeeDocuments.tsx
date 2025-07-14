import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  Space,
  Tag,
  Typography,
  Spin,
  Alert,
  Button,
  Upload,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import {
  FileTextOutlined,
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { getEmployeeProfile } from "@/api/employee.ts";
import type { Employee, PersonalDocument } from "@/types/employee.ts";

const { Title, Text } = Typography;
const { confirm } = Modal;

const EmployeeDocuments: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const data = await getEmployeeProfile();
        setEmployee(data);
      } catch (err) {
        setError("Failed to load employee data");
        console.error("Error fetching employee data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  const handleUploadDocument = () => {
    setUploadModalVisible(true);
  };

  const handleUploadSubmit = async () => {
    try {
      const values = await form.validateFields();
      // TODO: Implement API call to upload document
      console.log("Uploading document:", values);
      message.success("Document uploaded successfully");
      setUploadModalVisible(false);
      form.resetFields();
      // TODO: Refresh documents list
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDownloadDocument = (document: PersonalDocument) => {
    // TODO: Implement document download
    console.log("Downloading document:", document);
    message.info("Download functionality not implemented yet");
  };

  const handleViewDocument = (document: PersonalDocument) => {
    // TODO: Implement document preview
    console.log("Viewing document:", document);
    message.info("Document preview functionality not implemented yet");
  };

  const handleDeleteDocument = (document: PersonalDocument) => {
    confirm({
      title: "Are you sure you want to delete this document?",
      content: `This will permanently delete "${document.Title}".`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        // TODO: Implement API call to delete document
        console.log("Deleting document:", document);
        message.success("Document deleted successfully");
        // TODO: Refresh documents list
      },
    });
  };

  const getDocumentTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      "I-20": "blue",
      "I-94": "green",
      "OPT Receipt": "orange",
      "OPT EAD": "purple",
      "I-983": "cyan",
      Passport: "magenta",
      Visa: "gold",
      "Driver License": "lime",
      Other: "geekblue",
    };
    return colorMap[type] || "default";
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-96">
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (error || !employee) {
    return (
      <PageContainer>
        <Alert
          message="Error"
          description={error || "Employee data not found"}
          type="error"
          showIcon
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Documents Submitted"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleUploadDocument}
        >
          Upload Document
        </Button>
      }
    >
      <ProCard
        title={
          <Space>
            <FileTextOutlined />
            Personal Documents ({employee.PersonalDocuments.length})
          </Space>
        }
        headerBordered
      >
        {employee.PersonalDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
            <Title level={4} type="secondary">
              No documents uploaded
            </Title>
            <Text type="secondary">
              Upload your first document to get started
            </Text>
            <br />
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleUploadDocument}
              className="mt-4"
            >
              Upload Document
            </Button>
          </div>
        ) : (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3,
            }}
            dataSource={employee.PersonalDocuments}
            renderItem={(document) => (
              <List.Item>
                <Card
                  hoverable
                  actions={[
                    <Button
                      key="view"
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handleViewDocument(document)}
                    />,
                    <Button
                      key="download"
                      type="text"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownloadDocument(document)}
                    />,
                    <Button
                      key="delete"
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDeleteDocument(document)}
                    />,
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <FileTextOutlined className="text-2xl text-blue-500" />
                    }
                    title={
                      <div className="flex justify-between items-start">
                        <Text strong className="text-base">
                          {document.Title}
                        </Text>
                        <Tag color={getDocumentTypeColor(document.Type)}>
                          {document.Type}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="space-y-2">
                        {document.Comment && (
                          <Text type="secondary" className="text-sm">
                            {document.Comment}
                          </Text>
                        )}
                        <div className="text-xs text-gray-400">
                          Uploaded: {formatDate(document.CreateDate)}
                        </div>
                        {document.Path && (
                          <div className="text-xs text-gray-400">
                            File: {document.Path.split("/").pop()}
                          </div>
                        )}
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        )}
      </ProCard>

      {/* Upload Document Modal */}
      <Modal
        title="Upload New Document"
        open={uploadModalVisible}
        onOk={handleUploadSubmit}
        onCancel={() => {
          setUploadModalVisible(false);
          form.resetFields();
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Document Title"
            name="title"
            rules={[{ required: true, message: "Please enter document title" }]}
          >
            <Input placeholder="Enter document title" />
          </Form.Item>

          <Form.Item
            label="Document Type"
            name="type"
            rules={[{ required: true, message: "Please select document type" }]}
          >
            <Select placeholder="Select document type">
              <Select.Option value="I-20">I-20</Select.Option>
              <Select.Option value="I-94">I-94</Select.Option>
              <Select.Option value="OPT Receipt">OPT Receipt</Select.Option>
              <Select.Option value="OPT EAD">OPT EAD</Select.Option>
              <Select.Option value="I-983">I-983</Select.Option>
              <Select.Option value="Passport">Passport</Select.Option>
              <Select.Option value="Visa">Visa</Select.Option>
              <Select.Option value="Driver License">
                Driver License
              </Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Comment (Optional)" name="comment">
            <Input.TextArea
              rows={3}
              placeholder="Add any additional notes about this document"
            />
          </Form.Item>

          <Form.Item
            label="File"
            name="file"
            rules={[
              { required: true, message: "Please select a file to upload" },
            ]}
          >
            <Upload
              beforeUpload={() => false} // Prevent auto upload
              maxCount={1}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <div className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default EmployeeDocuments;
