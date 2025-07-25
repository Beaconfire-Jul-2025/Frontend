import { Divider, Space, Typography } from 'antd';
import React from 'react';
import AddressSection from '../Section/AddressSection';
import ContactSection from '../Section/ContactSection';
import DriverLicenseSection from '../Section/DriverLicenseSection';
import IdentitySection from '../Section/IdentitySection';
import NameSection from '../Section/NameSection';
import PersonalDocumentsSection from '../Section/PersonalDocumentsSection';
import RelatedPeopleSection from '../Section/RelatedPeopleSection';
import WorkAuthorizationSection from '../Section/WorkAuthorizationSection';

const { Title } = Typography;

export interface EmployeeProfileProps {
  employee: any;
  editable?: boolean;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({
  employee,
  editable = true,
}) => {
  // Helper to get last 4 digits of SSN
  const getLast4SSN = (ssn: string) => (ssn ? ssn.slice(-4) : '');

  // Add editing state for Name section
  const [isEditingName, setIsEditingName] = React.useState(false);

  // Handler for edit, save, cancel
  const handleEditName = () => setIsEditingName(true);
  const handleCancelName = () => setIsEditingName(false);
  const handleSaveName = (values: any) => {
    // TODO: Save logic (API call or state update)
    setIsEditingName(false);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <NameSection
        data={{
          firstName: employee.firstName,
          lastName: employee.lastName,
          middleName: employee.middleName,
          preferredName: employee.preferredName,
          avatarPath: employee.avatarPath,
          dob: employee.dob,
          gender: employee.gender,
          ssn: getLast4SSN(employee.ssn),
        }}
        mode={editable ? 'employee' : 'readonly'}
        isEditing={isEditingName}
        onEdit={handleEditName}
        onSave={handleSaveName}
        onCancel={handleCancelName}
      />
      <IdentitySection
        value={{
          ssn: getLast4SSN(employee.ssn),
          gender: employee.gender,
          dob: employee.dob,
        }}
        mode={editable ? 'employee' : 'readonly'}
        isEditing={false}
        form={{}}
      />
      <AddressSection addresses={employee.addresses} editable={editable} />
      <ContactSection
        contact={{
          email: employee.email,
          cellPhone: employee.cellPhone,
          workPhone: employee.workPhone,
        }}
        editable={editable}
      />
      <Divider />
      <Title level={4}>Emergency Contacts</Title>
      <RelatedPeopleSection
        people={employee.emergencyContacts}
        editable={editable}
        title="Emergency Contacts"
      />
      <Divider />
      <Title level={4}>References</Title>
      <RelatedPeopleSection
        people={employee.references}
        editable={editable}
        title="References"
      />
      <Divider />
      <PersonalDocumentsSection
        documents={employee.personalDocuments}
        editable={false}
      />
      <Divider />
      <WorkAuthorizationSection
        workAuthorization={employee.workAuthorization}
        editable={false}
      />
      <Divider />
      <DriverLicenseSection
        driverLicense={employee.driverLicense}
        document={employee.personalDocuments?.find(
          (doc) => doc.type === 'DRIVER_LICENSE',
        )}
        editable={editable}
      />
    </Space>
  );
};

export default EmployeeProfile;
