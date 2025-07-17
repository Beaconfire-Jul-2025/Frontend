import { Meta, StoryObj } from '@storybook/react-webpack5';
import OnboardingPage from './index';

const meta: Meta<typeof OnboardingPage> = {
  title: 'Pages/OnboardingPage',
  component: OnboardingPage,
};
export default meta;

type Story = StoryObj<typeof OnboardingPage>;

export const Default: Story = {
  render: () => <OnboardingPage />,
};

