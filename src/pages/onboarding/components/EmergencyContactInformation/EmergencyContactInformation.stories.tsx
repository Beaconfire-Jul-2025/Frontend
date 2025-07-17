import type { Meta, StoryObj } from '@storybook/react-webpack5';
import EmergencyContactInformation from './index';

const meta: Meta<typeof EmergencyContactInformation> = {
  title: 'Onboarding/EmergencyContactInformation',
  component: EmergencyContactInformation,
};
export default meta;

type Story = StoryObj<typeof EmergencyContactInformation>;

export const Default: Story = {
  args: {
    initialValues: [],
    onFinish: (_contacts: any[]) => {
      // handle finish
    },
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    initialValues: [],
    onFinish: (_contacts: any[]) => {},
    disabled: true,
  },
};
