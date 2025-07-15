import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Space, Spin, message, Table } from "antd";
import { HomeOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import {
  getCurrentHousing,
  type HousingInfo,
  type Address,
  type Landlord,
} from "@/api/housing";
import { getRoommates, type Roommate } from "@/api/employee";
import { AddressSection } from "@/components/common/EmployeeProfile/sections/AddressSection";
import { NameSection } from "@/components/common/EmployeeProfile/sections/NameSection";
import { ContactSection } from "@/components/common/EmployeeProfile/sections/ContactSection";

const { Title, Text } = Typography;

interface LandlordDisplayProps {
  landlord: Landlord;
}

const LandlordDisplay: React.FC<LandlordDisplayProps> = ({ landlord }) => {
  // Create a mock employee object for the NameSection and ContactSection components
  const mockEmployee = {
    firstName: landlord.firstName,
    lastName: landlord.lastName,
    email: landlord.email,
    cellPhone: landlord.cellPhone || "",
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <NameSection
        employee={mockEmployee}
        mode="view"
        isEditing={false}
        form={null}
      />
      <ContactSection
        employee={mockEmployee}
        mode="view"
        isEditing={false}
        form={null}
      />
    </Space>
  );
};

interface AddressDisplayProps {
  address: Address;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
  // Create a mock employee object for the AddressSection component
  const mockEmployee = {
    addresses: [address],
  };

  return (
    <AddressSection
      employee={mockEmployee}
      mode="view"
      isEditing={false}
      form={null}
    />
  );
};

interface RoommateTableProps {
  roommates: Roommate[];
}

const RoommateTable: React.FC<RoommateTableProps> = ({ roommates }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "preferredName",
      key: "name",
      render: (_: any, record: Roommate) =>
        record.preferredName || `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <Table
      dataSource={roommates}
      columns={columns}
      rowKey="id"
      pagination={false}
      size="small"
    />
  );
};

const EmployeeHousingDetails: React.FC = () => {
  const [housing, setHousing] = useState<HousingInfo | null>(null);
  const [roommates, setRoommates] = useState<Roommate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHousingData = async () => {
      try {
        setLoading(true);
        const [housingData, roommatesData] = await Promise.all([
          getCurrentHousing(),
          getRoommates(),
        ]);
        setHousing(housingData);
        setRoommates(roommatesData);
      } catch (error) {
        console.error("Failed to fetch housing data:", error);
        message.error("Failed to load housing information");
      } finally {
        setLoading(false);
      }
    };

    fetchHousingData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!housing) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Text type="secondary">No housing information available</Text>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>
        <HomeOutlined /> House Details
      </Title>

      <Row gutter={[16, 16]}>
        {/* Address Section */}
        <Col xs={24} lg={12}>
          <ProCard
            title={
              <Space>
                <HomeOutlined />
                Address
              </Space>
            }
            bordered
          >
            <AddressDisplay address={housing.address} />
          </ProCard>
        </Col>

        {/* Landlord Information */}
        <Col xs={24} lg={12}>
          <ProCard
            title={
              <Space>
                <UserOutlined />
                Landlord Information
              </Space>
            }
            bordered
          >
            <LandlordDisplay landlord={housing.landlord} />
          </ProCard>
        </Col>

        {/* Roommates Section */}
        <Col xs={24}>
          <ProCard
            title={
              <Space>
                <UserOutlined />
                Roommates ({roommates.length})
              </Space>
            }
            bordered
          >
            {roommates.length > 0 ? (
              <RoommateTable roommates={roommates} />
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Text type="secondary">No roommates found</Text>
              </div>
            )}
          </ProCard>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeHousingDetails;
