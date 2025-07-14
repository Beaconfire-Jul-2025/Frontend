import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Descriptions,
  List,
  Space,
  Tag,
  Typography,
  Spin,
  Alert,
  Button,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  IdcardOutlined,
  CarOutlined,
  ContactsOutlined,
  FileTextOutlined,
  CalendarOutlined,
  GlobalOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { getEmployeeProfile } from "@/api/employee";
import type { Employee, Address } from "@/types/employee";

const { Title, Text } = Typography;

const EmployeePersonalInfo: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description={error || "Employee data not found"}
          type="error"
          showIcon
        />
      </div>
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Avatar */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-6">
            <Avatar
              size={120}
              src={employee.AvatarPath}
              icon={<UserOutlined />}
              className="border-4 border-white shadow-lg"
            />
            <div>
              <Title level={2} className="!mb-1">
                {getFullName()}
              </Title>
              {employee.PreferredName && (
                <Text type="secondary" className="text-lg">
                  Preferred: {employee.PreferredName}
                </Text>
              )}
              <div className="mt-2">
                <Tag color="blue" className="text-sm">
                  Employee ID: {employee.ID}
                </Tag>
                <Tag color="green" className="text-sm">
                  {employee.ApplicationType}
                </Tag>
              </div>
            </div>
          </div>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <ProCard
              title={
                <Space>
                  <UserOutlined />
                  Basic Information
                </Space>
              }
              headerBordered
            >
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="Full Name" span={2}>
                  {getFullName()}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
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
                {employee.WorkPhone && (
                  <Descriptions.Item label="Work Phone">
                    <Space>
                      <PhoneOutlined />
                      {employee.WorkPhone}
                    </Space>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Gender">
                  {employee.Gender}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(employee.DOB)}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="SSN">
                  {employee.SSN}
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(employee.StartDate)}
                  </Space>
                </Descriptions.Item>
                {employee.EndDate && (
                  <Descriptions.Item label="End Date">
                    <Space>
                      <CalendarOutlined />
                      {formatDate(employee.EndDate)}
                    </Space>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="House ID">
                  {employee.HouseID}
                </Descriptions.Item>
              </Descriptions>
            </ProCard>

            {/* Addresses */}
            <ProCard
              title={
                <Space>
                  <HomeOutlined />
                  Addresses
                </Space>
              }
              headerBordered
            >
              <div className="space-y-4">
                {employee.Addresses.map((address, index) => (
                  <Card
                    key={index}
                    size="small"
                    className="border-l-4 border-l-blue-500"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Tag
                          color={address.Type === "PRIMARY" ? "blue" : "orange"}
                        >
                          {address.Type}
                        </Tag>
                        <div className="mt-2">
                          <Text strong>{formatAddress(address)}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ProCard>

            {/* Work Authorization */}
            <ProCard
              title={
                <Space>
                  <GlobalOutlined />
                  Work Authorization
                </Space>
              }
              headerBordered
            >
              <Descriptions column={2} bordered size="small">
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
                      employee.WorkAuthorization.GreenCardHolder
                        ? "green"
                        : "red"
                    }
                  >
                    {employee.WorkAuthorization.GreenCardHolder ? "Yes" : "No"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Type" span={2}>
                  {employee.WorkAuthorization.Type}
                </Descriptions.Item>
                {employee.WorkAuthorization.StartDate && (
                  <Descriptions.Item label="Start Date">
                    {formatDate(employee.WorkAuthorization.StartDate)}
                  </Descriptions.Item>
                )}
                {employee.WorkAuthorization.EndDate && (
                  <Descriptions.Item label="End Date">
                    {formatDate(employee.WorkAuthorization.EndDate)}
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Last Modified" span={2}>
                  {formatDate(employee.WorkAuthorization.LastModificationDate)}
                </Descriptions.Item>
              </Descriptions>
            </ProCard>

            {/* Driver License */}
            <ProCard
              title={
                <Space>
                  <CarOutlined />
                  Driver License
                </Space>
              }
              headerBordered
            >
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="Has License">
                  <Tag
                    color={employee.DriverLicense.HasLicense ? "green" : "red"}
                  >
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
            </ProCard>
          </div>

          {/* Right Column - Contacts and Documents */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <ProCard
              title={
                <Space>
                  <ContactsOutlined />
                  Emergency Contacts
                </Space>
              }
              headerBordered
            >
              <List
                dataSource={employee.EmergencyContacts}
                renderItem={(contact) => (
                  <List.Item>
                    <Card size="small" className="w-full">
                      <div className="space-y-2">
                        <div>
                          <Text strong>
                            {[
                              contact.FirstName,
                              contact.MiddleName,
                              contact.LastName,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          </Text>
                          <Tag color="blue" className="ml-2">
                            {contact.Relationship}
                          </Tag>
                        </div>
                        <div className="space-y-1">
                          <div>
                            <PhoneOutlined className="mr-2" />
                            <Text>{contact.CellPhone}</Text>
                          </div>
                          <div>
                            <MailOutlined className="mr-2" />
                            <Text>{contact.Email}</Text>
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
                  </List.Item>
                )}
              />
            </ProCard>

            {/* References */}
            <ProCard
              title={
                <Space>
                  <IdcardOutlined />
                  References
                </Space>
              }
              headerBordered
            >
              <List
                dataSource={employee.References}
                renderItem={(reference) => (
                  <List.Item>
                    <Card size="small" className="w-full">
                      <div className="space-y-2">
                        <div>
                          <Text strong>
                            {[
                              reference.FirstName,
                              reference.MiddleName,
                              reference.LastName,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          </Text>
                          <Tag color="purple" className="ml-2">
                            {reference.Relationship}
                          </Tag>
                        </div>
                        <div className="space-y-1">
                          <div>
                            <PhoneOutlined className="mr-2" />
                            <Text>{reference.Phone}</Text>
                          </div>
                          <div>
                            <MailOutlined className="mr-2" />
                            <Text>{reference.Email}</Text>
                          </div>
                          <div>
                            <HomeOutlined className="mr-2" />
                            <Text type="secondary" className="text-sm">
                              {formatAddress(reference.Address)}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </ProCard>

            {/* Personal Documents */}
            <ProCard
              title={
                <Space>
                  <FileTextOutlined />
                  Personal Documents
                </Space>
              }
              headerBordered
            >
              <List
                dataSource={employee.PersonalDocuments}
                renderItem={(document) => (
                  <List.Item>
                    <Card size="small" className="w-full">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <Text strong>{document.Title}</Text>
                          <Tag color="geekblue">{document.Type}</Tag>
                        </div>
                        {document.Comment && (
                          <Text type="secondary" className="text-sm">
                            {document.Comment}
                          </Text>
                        )}
                        <div className="text-xs text-gray-500">
                          Created: {formatDate(document.CreateDate)}
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </ProCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePersonalInfo;
