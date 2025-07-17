import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DriverLicenseDisplay } from './index';

const meta: Meta<typeof DriverLicenseDisplay> = {
  title: 'Information/DriverLicenseDisplay',
  component: DriverLicenseDisplay,
};
export default meta;

type Story = StoryObj<typeof DriverLicenseDisplay>;

export const HasLicenseWithDocument: Story = {
  args: {
    driverLicense: {
      hasLicense: true,
      licenseNumber: 'D1234567',
      expirationDate: '2026-08-15',
    },
    document: {
      path: 'https://example.com/license.pdf',
      title: 'Driver License PDF',
    },
  },
};

export const HasLicenseNoDocument: Story = {
  args: {
    driverLicense: {
      hasLicense: true,
      licenseNumber: 'D7654321',
      expirationDate: '2027-01-01',
    },
    document: undefined,
  },
};

export const NoLicense: Story = {
  args: {
    driverLicense: {
      hasLicense: false,
      licenseNumber: '',
      expirationDate: '',
    },
    document: undefined,
  },
};
