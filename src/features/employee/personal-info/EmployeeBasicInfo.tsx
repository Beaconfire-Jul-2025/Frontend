import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Descriptions,
  Space,
  Tag,
  Typography,
  Spin,
  Alert,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CarOutlined,
  ContactsOutlined,
  CalendarOutlined,
  GlobalOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { getEmployeeProfile } from "@/api/employee.ts";
import type { Employee, Address } from "@/types/employee.ts";

const { Title, Text } = Typography;
const { confirm } = Modal;

type EditSection =
  | "name"
  | "address"
  | "contact"
  | "employment"
  | "driverLicense"
  | null;

const EmployeeBasicInfo: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<EditSection>(null);
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

  const handleEdit = (section: EditSection) => {
    if (!employee) return;

    setEditingSection(section);

    switch (section) {
      case "name":
        form.setFieldsValue({
          firstName: employee.firstName,
          middleName: employee.middleName,
          lastName: employee.lastName,
          preferredName: employee.preferredName,
          dob: dayjs(employee.dob),
          gender: employee.gender,
          ssn: employee.ssn,
        });
        break;
      case "address":
        const primaryAddress = employee.addresses.find(
          (addr) => addr.type === "PRIMARY",
        );
        const secondaryAddress = employee.addresses.find(
          (addr) => addr.type === "SECONDARY",
        );
        form.setFieldsValue({
          primaryAddressLine1: primaryAddress?.addressLine1,
          primaryAddressLine2: primaryAddress?.addressLine2,
          primaryCity: primaryAddress?.city,
          primaryState: primaryAddress?.state,
          primaryZipCode: primaryAddress?.zipCode,
          secondaryAddressLine1: secondaryAddress?.addressLine1,
          secondaryAddressLine2: secondaryAddress?.addressLine2,
          secondaryCity: secondaryAddress?.city,
          secondaryState: secondaryAddress?.state,
          secondaryZipCode: secondaryAddress?.zipCode,
        });
        break;
      case "contact":
        form.setFieldsValue({
          email: employee.email,
          cellPhone: employee.cellPhone,
          workPhone: employee.workPhone,
        });
        break;
      case "employment":
        form.setFieldsValue({
          isUsCitizen: employee.workAuthorization.isUsCitizen,
          greenCardHolder: employee.workAuthorization.greenCardHolder,
          workAuthType: employee.workAuthorization.type,
          workAuthStartDate: employee.workAuthorization.startDate
            ? dayjs(employee.workAuthorization.startDate)
            : null,
          workAuthEndDate: employee.workAuthorization.endDate
            ? dayjs(employee.workAuthorization.endDate)
            : null,
          employmentStartDate: dayjs(employee.startDate),
          employmentEndDate: employee.endDate ? dayjs(employee.endDate) : null,
        });
        break;
      case "driverLicense":
        form.setFieldsValue({
          hasLicense: employee.driverLicense.hasLicense,
          licenseNumber: employee.driverLicense.licenseNumber,
          expirationDate: employee.driverLicense.expirationDate
            ? dayjs(employee.driverLicense.expirationDate)
            : null,
        });
        break;
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving data:", values);
      message.success("Information updated successfully");
      setEditingSection(null);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    confirm({
      title: "Are you sure to discard all your changes?",
      content: "All unsaved changes will be lost.",
      onOk() {
        setEditingSection(null);
        form.resetFields();
      },
    });
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

  const getFullName = () => {
    const parts = [
      employee.firstName,
      employee.middleName,
      employee.lastName,
    ].filter(Boolean);
    return parts.join(" ");
  };

  const formatAddress = (address: Address) => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.zipCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const formatDate = (dateString: string) =>
    dayjs(dateString).format("MMM DD, YYYY");

  const maskSSN = (ssn: string) => `***-**-${ssn.slice(-4)}`;

  const calculateAge = (dob: string) => dayjs().diff(dayjs(dob), "year");

  const renderEditButtons = (section: EditSection) => {
    if (editingSection === section) {
      return (
        <Space>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save
          </Button>
          <Button icon={<CloseOutlined />} onClick={handleCancel}>
            Cancel
          </Button>
        </Space>
      );
    }
    return (
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={() => handleEdit(section)}
      >
        Edit
      </Button>
    );
  };

  const primaryAddress = employee.addresses.find(
    (addr) => addr.type === "PRIMARY",
  );
  const secondaryAddress = employee.addresses.find(
    (addr) => addr.type === "SECONDARY",
  );

  return (
    <div className="space-y-6">
      {/* Name Section */}
      <ProCard
        title={
          <Space>
            <UserOutlined />
            Name Information
          </Space>
        }
        headerBordered
        extra={renderEditButtons("name")}
      >
        {editingSection === "name" ? (
          <Form form={form} layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Middle Name" name="middleName">
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Preferred Name" name="preferredName">
                <Input />
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                  { required: true, message: "Please select date of birth" },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select gender" }]}
              >
                <Select>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="SSN"
                name="ssn"
                rules={[{ required: true, message: "Please enter SSN" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </Form>
        ) : (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Legal Name" span={2}>
              <Text strong>{getFullName()}</Text>
            </Descriptions.Item>
            {employee.preferredName && (
              <Descriptions.Item label="Preferred Name" span={2}>
                {employee.preferredName}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Date of Birth">
              <Space>
                <CalendarOutlined />
                {formatDate(employee.dob)}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {calculateAge(employee.dob)} years old
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {employee.gender}
            </Descriptions.Item>
            <Descriptions.Item label="SSN">
              {maskSSN(employee.ssn)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </ProCard>

      {/* Address Section */}
      <ProCard
        title={
          <Space>
            <HomeOutlined />
            Address Information
          </Space>
        }
        headerBordered
        extra={renderEditButtons("address")}
      >
        {editingSection === "address" ? (
          <Form form={form} layout="vertical">
            <Title level={5}>Primary Address</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Form.Item label="Address Line 1" name="primaryAddressLine1">
                <Input />
              </Form.Item>
              <Form.Item label="Address Line 2" name="primaryAddressLine2">
                <Input />
              </Form.Item>
              <Form.Item label="City" name="primaryCity">
                <Input />
              </Form.Item>
              <Form.Item label="State" name="primaryState">
                <Input />
              </Form.Item>
              <Form.Item label="Zip Code" name="primaryZipCode">
                <Input />
              </Form.Item>
            </div>

            <Title level={5}>Secondary Address</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Address Line 1" name="secondaryAddressLine1">
                <Input />
              </Form.Item>
              <Form.Item label="Address Line 2" name="secondaryAddressLine2">
                <Input />
              </Form.Item>
              <Form.Item label="City" name="secondaryCity">
                <Input />
              </Form.Item>
              <Form.Item label="State" name="secondaryState">
                <Input />
              </Form.Item>
              <Form.Item label="Zip Code" name="secondaryZipCode">
                <Input />
              </Form.Item>
            </div>
          </Form>
        ) : (
          <div className="space-y-4">
            {primaryAddress && (
              <Card size="small" className="border-l-4 border-l-blue-500">
                <div>
                  <Tag color="blue">PRIMARY</Tag>
                  <div className="mt-2">
                    <Text strong>{formatAddress(primaryAddress)}</Text>
                  </div>
                </div>
              </Card>
            )}

            {secondaryAddress && (
              <Card size="small" className="border-l-4 border-l-orange-500">
                <div>
                  <Tag color="orange">SECONDARY</Tag>
                  <div className="mt-2">
                    <Text strong>{formatAddress(secondaryAddress)}</Text>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </ProCard>

      {/* Contact Info Section */}
      <ProCard
        title={
          <Space>
            <PhoneOutlined />
            Contact Information
          </Space>
        }
        headerBordered
        extra={renderEditButtons("contact")}
      >
        {editingSection === "contact" ? (
          <Form form={form} layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Personal Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Work Phone" name="workPhone">
                <Input />
              </Form.Item>
              <Form.Item
                label="Cell Phone"
                name="cellPhone"
                rules={[{ required: true, message: "Please enter cell phone" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </Form>
        ) : (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Personal Email" span={2}>
              <Space>
                <MailOutlined />
                {employee.email}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Cell Phone">
              <Space>
                <PhoneOutlined />
                {employee.cellPhone}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Work Phone">
              <Space>
                <PhoneOutlined />
                {employee.workPhone || "Not provided"}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        )}
      </ProCard>

      {/* Employment Section */}
      <ProCard
        title={
          <Space>
            <GlobalOutlined />
            Employment Information
          </Space>
        }
        headerBordered
        extra={renderEditButtons("employment")}
      >
        {editingSection === "employment" ? (
          <Form form={form} layout="vertical">
            <Title level={5}>Work Authorization</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Form.Item label="US Citizen" name="isUsCitizen">
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Green Card Holder" name="greenCardHolder">
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Work Authorization Type" name="workAuthType">
                <Input />
              </Form.Item>
              <Form.Item label="Work Auth Start Date" name="workAuthStartDate">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Work Auth End Date" name="workAuthEndDate">
                <DatePicker />
              </Form.Item>
            </div>

            <Title level={5}>Employment Dates</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Employment Start Date"
                name="employmentStartDate"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item label="Employment End Date" name="employmentEndDate">
                <DatePicker />
              </Form.Item>
            </div>
          </Form>
        ) : (
          <div className="space-y-4">
            <Descriptions
              column={2}
              bordered
              size="small"
              title="Work Authorization"
            >
              <Descriptions.Item label="US Citizen">
                <Tag
                  color={
                    employee.workAuthorization.isUsCitizen ? "green" : "red"
                  }
                >
                  {employee.workAuthorization.isUsCitizen ? "Yes" : "No"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Green Card Holder">
                <Tag
                  color={
                    employee.workAuthorization.greenCardHolder ? "green" : "red"
                  }
                >
                  {employee.workAuthorization.greenCardHolder ? "Yes" : "No"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Type" span={2}>
                {employee.workAuthorization.type}
              </Descriptions.Item>
              {employee.workAuthorization.startDate && (
                <Descriptions.Item label="Work Auth Start Date">
                  {formatDate(employee.workAuthorization.startDate)}
                </Descriptions.Item>
              )}
              {employee.workAuthorization.endDate && (
                <Descriptions.Item label="Work Auth End Date">
                  {formatDate(employee.workAuthorization.endDate)}
                </Descriptions.Item>
              )}
            </Descriptions>

            <Descriptions
              column={2}
              bordered
              size="small"
              title="Employment Dates"
            >
              <Descriptions.Item label="Employment Start Date">
                <Space>
                  <CalendarOutlined />
                  {formatDate(employee.startDate)}
                </Space>
              </Descriptions.Item>
              {employee.endDate && (
                <Descriptions.Item label="Employment End Date">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(employee.endDate)}
                  </Space>
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        )}
      </ProCard>

      {/* Driver License Section */}
      <ProCard
        title={
          <Space>
            <CarOutlined />
            Driver License
          </Space>
        }
        headerBordered
        extra={renderEditButtons("driverLicense")}
      >
        {editingSection === "driverLicense" ? (
          <Form form={form} layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item label="Has License" name="hasLicense">
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="License Number" name="licenseNumber">
                <Input />
              </Form.Item>
              <Form.Item label="Expiration Date" name="expirationDate">
                <DatePicker />
              </Form.Item>
            </div>
          </Form>
        ) : (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Has License">
              <Tag color={employee.driverLicense.hasLicense ? "green" : "red"}>
                {employee.driverLicense.hasLicense ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
            {employee.driverLicense.hasLicense && (
              <>
                <Descriptions.Item label="License Number">
                  {employee.driverLicense.licenseNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Expiration Date" span={2}>
                  <Space>
                    <CalendarOutlined />
                    {formatDate(employee.driverLicense.expirationDate)}
                  </Space>
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        )}
      </ProCard>

      {/* Emergency Contacts Section */}
      <ProCard
        title={
          <Space>
            <ContactsOutlined />
            Emergency Contacts
          </Space>
        }
        headerBordered
      >
        <div className="space-y-4">
          {employee.emergencyContacts.map((contact, index) => (
            <Card
              key={index}
              size="small"
              className="border-l-4 border-l-red-500"
            >
              <div className="space-y-2">
                <div>
                  <Text strong>
                    {[contact.firstName, contact.middleName, contact.lastName]
                      .filter(Boolean)
                      .join(" ")}
                  </Text>
                  <Tag color="red" className="ml-2">
                    {contact.relationship}
                  </Tag>
                </div>
                <div className="space-y-1">
                  <div>
                    <PhoneOutlined className="mr-2" />
                    <Text>{contact.cellPhone}</Text>
                  </div>
                  <div>
                    <HomeOutlined className="mr-2" />
                    <Text type="secondary" className="text-sm">
                      {formatAddress(contact.address)}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ProCard>
    </div>
  );
};

export default EmployeeBasicInfo;
