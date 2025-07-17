import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ReferenceInformation from './index';

const meta: Meta<typeof ReferenceInformation> = {
  title: 'Onboarding/ReferenceInformation',
  component: ReferenceInformation,
};
export default meta;

type Story = StoryObj<typeof ReferenceInformation>;

export const Default: Story = {
  args: {
    initialValues: [],
    onFinish: (_references: any[]) => {
      // handle finish
    },
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    initialValues: [],
    onFinish: (_references: any[]) => {},
    disabled: true,
  },
};
