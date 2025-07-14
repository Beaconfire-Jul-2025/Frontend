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

    // Populate form with current data based on section
    switch (section) {
      case "name":
        form.setFieldsValue({
          firstName: employee.FirstName,
          middleName: employee.MiddleName,
          lastName: employee.LastName,
          preferredName: employee.PreferredName,
          dob: dayjs(employee.DOB),
          gender: employee.Gender,
          ssn: employee.SSN,
        });
        break;
      case "address":
        const primaryAddress = employee.Addresses.find(
          (addr) => addr.Type === "PRIMARY",
        );
        const secondaryAddress = employee.Addresses.find(
          (addr) => addr.Type === "SECONDARY",
        );
        form.setFieldsValue({
          primaryAddressLine1: primaryAddress?.AddressLine1,
          primaryAddressLine2: primaryAddress?.AddressLine2,
          primaryCity: primaryAddress?.City,
          primaryState: primaryAddress?.State,
          primaryZipCode: primaryAddress?.ZipCode,
          secondaryAddressLine1: secondaryAddress?.AddressLine1,
          secondaryAddressLine2: secondaryAddress?.AddressLine2,
          secondaryCity: secondaryAddress?.City,
          secondaryState: secondaryAddress?.State,
          secondaryZipCode: secondaryAddress?.ZipCode,
        });
        break;
      case "contact":
        form.setFieldsValue({
          email: employee.Email,
          cellPhone: employee.CellPhone,
          workPhone: employee.WorkPhone,
        });
        break;
      case "employment":
        form.setFieldsValue({
          isUSCitizen: employee.WorkAuthorization.IsUSCitizen,
          greenCardHolder: employee.WorkAuthorization.GreenCardHolder,
          workAuthType: employee.WorkAuthorization.Type,
          workAuthStartDate: employee.WorkAuthorization.StartDate
            ? dayjs(employee.WorkAuthorization.StartDate)
            : null,
          workAuthEndDate: employee.WorkAuthorization.EndDate
            ? dayjs(employee.WorkAuthorization.EndDate)
            : null,
          employmentStartDate: dayjs(employee.StartDate),
          employmentEndDate: employee.EndDate ? dayjs(employee.EndDate) : null,
        });
        break;
      case "driverLicense":
        form.setFieldsValue({
          hasLicense: employee.DriverLicense.HasLicense,
          licenseNumber: employee.DriverLicense.LicenseNumber,
          expirationDate: employee.DriverLicense.ExpirationDate
            ? dayjs(employee.DriverLicense.ExpirationDate)
            : null,
        });
        break;
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // TODO: Implement API call to save data
      console.log("Saving data:", values);
      message.success("Information updated successfully");
      setEditingSection(null);
      // TODO: Refresh employee data
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
      employee.FirstName,
      employee.MiddleName,
      employee.LastName,
    ].filter(Boolean);
    return parts.join(" ");
  };

  const formatAddress = (address: Address) => {
    const parts = [
      address.AddressLine1,
      address.AddressLine2,
      address.City,
      address.State,
      address.ZipCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  const maskSSN = (ssn: string) => {
    return `***-**-${ssn.slice(-4)}`;
  };

  const calculateAge = (dob: string) => {
    return dayjs().diff(dayjs(dob), "year");
  };

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

  const primaryAddress = employee.Addresses.find(
    (addr) => addr.Type === "PRIMARY",
  );
  const secondaryAddress = employee.Addresses.find(
    (addr) => addr.Type === "SECONDARY",
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
            {employee.PreferredName && (
              <Descriptions.Item label="Preferred Name" span={2}>
                {employee.PreferredName}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Date of Birth">
              <Space>
                <CalendarOutlined />
                {formatDate(employee.DOB)}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {calculateAge(employee.DOB)} years old
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {employee.Gender}
            </Descriptions.Item>
            <Descriptions.Item label="SSN">
              {maskSSN(employee.SSN)}
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
                {employee.Email}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Cell Phone">
              <Space>
                <PhoneOutlined />
                {employee.CellPhone}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Work Phone">
              <Space>
                <PhoneOutlined />
                {employee.WorkPhone || "Not provided"}
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
              <Form.Item label="US Citizen" name="isUSCitizen">
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
                    employee.WorkAuthorization.IsUSCitizen ? "green" : "red"
                  }
                >
                  {employee.WorkAuthorization.IsUSCitizen ? "Yes" : "No"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Green Card Holder">
                <Tag
                  color={
                    employee.WorkAuthorization.GreenCardHolder ? "green" : "red"
                  }
                >
                  {employee.WorkAuthorization.GreenCardHolder ? "Yes" : "No"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Type" span={2}>
                {employee.WorkAuthorization.Type}
              </Descriptions.Item>
              {employee.WorkAuthorization.StartDate && (
                <Descriptions.Item label="Work Auth Start Date">
                  {formatDate(employee.WorkAuthorization.StartDate)}
                </Descriptions.Item>
              )}
              {employee.WorkAuthorization.EndDate && (
                <Descriptions.Item label="Work Auth End Date">
                  {formatDate(employee.WorkAuthorization.EndDate)}
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
                  {formatDate(employee.StartDate)}
                </Space>
              </Descriptions.Item>
              {employee.EndDate && (
                <Descriptions.Item label="Employment End Date">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(employee.EndDate)}
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
              <Tag color={employee.DriverLicense.HasLicense ? "green" : "red"}>
                {employee.DriverLicense.HasLicense ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>
            {employee.DriverLicense.HasLicense && (
              <>
                <Descriptions.Item label="License Number">
                  {employee.DriverLicense.LicenseNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Expiration Date" span={2}>
                  <Space>
                    <CalendarOutlined />
                    {formatDate(employee.DriverLicense.ExpirationDate)}
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
          {employee.EmergencyContacts.map((contact, index) => (
            <Card
              key={index}
              size="small"
              className="border-l-4 border-l-red-500"
            >
              <div className="space-y-2">
                <div>
                  <Text strong>
                    {[contact.FirstName, contact.MiddleName, contact.LastName]
                      .filter(Boolean)
                      .join(" ")}
                  </Text>
                  <Tag color="red" className="ml-2">
                    {contact.Relationship}
                  </Tag>
                </div>
                <div className="space-y-1">
                  <div>
                    <PhoneOutlined className="mr-2" />
                    <Text>{contact.CellPhone}</Text>
                  </div>
                  <div>
                    <HomeOutlined className="mr-2" />
                    <Text type="secondary" className="text-sm">
                      {formatAddress(contact.Address)}
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
