import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import EmployeeProfile from './index';

const employee = {
  id: 'emp001',
  userId: 'user001',
  firstName: 'John',
  lastName: 'Doe',
  middleName: 'Michael',
  preferredName: 'Johnny',
  avatarPath: 'https://i.pravatar.cc/100?img=3',
  email: 'john.doe@example.com',
  cellPhone: '(555) 123-4567',
  workPhone: '(555) 987-6543',
  gender: 'Male',
  ssn: '123456789',
  dob: '1990-05-15',
  startDate: '2022-01-15',
  endDate: undefined,
  houseId: 'house001',
  addresses: [
    {
      type: 'PRIMARY',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
    },
    {
      type: 'SECONDARY',
      addressLine1: '456 Oak Avenue',
      addressLine2: '',
      city: 'Bellevue',
      state: 'WA',
      zipCode: '98004',
    },
  ],
  workAuthorization: {
    isUsCitizen: true,
    greenCardHolder: false,
    type: 'US Citizen',
    startDate: null,
    endDate: null,
    lastModificationDate: '2022-01-15',
  },
  driverLicense: {
    hasLicense: true,
    licenseNumber: 'WA123456789',
    expirationDate: '2028-05-15',
  },
  emergencyContacts: [
    {
      firstName: 'Jane',
      lastName: 'Doe',
      middleName: 'Elizabeth',
      cellPhone: '(555) 234-5678',
      alternatePhone: '(555) 345-6789',
      email: 'jane.doe@example.com',
      relationship: 'Spouse',
      address: {
        type: 'HOME',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
      },
    },
    {
      firstName: 'Robert',
      lastName: 'Doe',
      middleName: 'James',
      cellPhone: '(555) 456-7890',
      email: 'robert.doe@example.com',
      relationship: 'Father',
      address: {
        type: 'HOME',
        addressLine1: '789 Pine Street',
        addressLine2: '',
        city: 'Portland',
        state: 'OR',
        zipCode: '97201',
      },
    },
  ],
  references: [
    {
      firstName: 'Sarah',
      lastName: 'Wilson',
      middleName: 'Ann',
      phone: '(555) 567-8901',
      email: 'sarah.wilson@company.com',
      relationship: 'Former Manager',
      address: {
        type: 'WORK',
        addressLine1: '100 Business Ave',
        addressLine2: 'Suite 200',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98102',
      },
    },
  ],
  personalDocuments: [
    {
      type: 'DRIVER_LICENSE',
      path: '/documents/driver_license.pdf',
      title: 'Driver License',
      comment: 'Valid driver license',
      createDate: '2022-01-15',
    },
    {
      type: 'PASSPORT',
      path: '/documents/passport.pdf',
      title: 'US Passport',
      comment: 'Valid US passport',
      createDate: '2022-01-15',
    },
  ],
  applicationType: 'ONBOARD',
};

const meta: Meta<typeof EmployeeProfile> = {
  title: 'EmployeeProfile',
  component: EmployeeProfile,
};
export default meta;

type Story = StoryObj<typeof EmployeeProfile>;

export const Default: Story = {
  render: () => <EmployeeProfile employee={employee} editable={true} />,
};
