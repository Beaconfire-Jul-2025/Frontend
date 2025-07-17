import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { WorkAuthorizationData } from './data.d';
import WorkAuthorizationInformation from './index';

const meta: Meta<typeof WorkAuthorizationInformation> = {
  title: 'Onboarding/WorkAuthorizationInformation',
  component: WorkAuthorizationInformation,
};
export default meta;

const mockData: WorkAuthorizationData = {
  isUsCitizen: false,
  greenCardHolder: false,
  type: 'Other',
  startDate: '2025-01-01',
  endDate: '2026-01-01',
  lastModificationDate: '2025-07-17',
  nonCitizenData: undefined,
};

export const Default: StoryObj<typeof WorkAuthorizationInformation> = {
  args: {
    value: mockData,
  },
};
