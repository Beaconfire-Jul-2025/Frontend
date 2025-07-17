import { Avatar, Card, Descriptions, List } from 'antd';
import React from 'react';

interface Roommate {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  avatarPath?: string;
  email?: string;
  cellPhone?: string;
  alternatePhone?: string;
}

interface HousingInfo {
  address: string;
  roommates?: Roommate[];
}

interface HouseDisplayProps {
  housing: HousingInfo | null;
}

const getDisplayName = (roommate: Roommate) => {
  if (roommate.preferredName?.trim()) {
    return roommate.preferredName;
  }
  // Legal name: first + (middle if exists) + last
  return [roommate.firstName, roommate.middleName, roommate.lastName]
    .filter(Boolean)
    .join(' ');
};

const HouseDisplay: React.FC<HouseDisplayProps> = ({ housing }) => {
  if (!housing) return <div>No house information available.</div>;

  return (
    <div>
      <Descriptions bordered>
        <Descriptions.Item label="Address">{housing.address}</Descriptions.Item>
      </Descriptions>
      {/* Roommates list appears below Descriptions, not wrapped by it */}
      {housing.roommates && housing.roommates.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>Roommates</h3>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={housing.roommates}
            renderItem={(roommate) => (
              <List.Item>
                <Card>
                  <Card.Meta
                    avatar={<Avatar src={roommate.avatarPath} />}
                    title={getDisplayName(roommate)}
                    description={
                      roommate.cellPhone
                        ? `Cell: ${roommate.cellPhone}`
                        : 'No cell phone'
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default HouseDisplay;
