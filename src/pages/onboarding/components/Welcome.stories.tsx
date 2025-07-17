import type { Meta, StoryObj } from '@storybook/react';
import Welcome from './Welcome';

const meta: Meta<typeof Welcome> = {
  title: 'Onboarding/Welcome',
  component: Welcome,
};
export default meta;

type Story = StoryObj<typeof Welcome>;

export const Default: Story = {
  args: {
    onStart: () => {
      // For Storybook 9+, use console.log for interaction
      console.log('Start button clicked');
    },
  },
};

