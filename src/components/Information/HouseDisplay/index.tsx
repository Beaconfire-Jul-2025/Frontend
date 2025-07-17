import { Descriptions } from 'antd';
import React from 'react';

interface HousingInfo {
  address: string;
}

interface HouseDisplayProps {
  housing: HousingInfo | null;
}

const HouseDisplay: React.FC<HouseDisplayProps> = ({ housing }) => {
  if (!housing) return <div>No house information available.</div>;

  return (
    <>
      <Descriptions.Item label="Address">{housing.address}</Descriptions.Item>
    </>
  );
};

export default HouseDisplay;
