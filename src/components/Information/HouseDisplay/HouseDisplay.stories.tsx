import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Descriptions } from 'antd';
import HouseDisplay from './index';

const meta: Meta<typeof HouseDisplay> = {
  title: 'Information/HouseDisplay',
  component: HouseDisplay,
};

export default meta;

type Story = StoryObj<typeof HouseDisplay>;

const Wrapper = (args: any) => (
  <Descriptions title="House Information" bordered>
    <Descriptions.Item label="House">
      <HouseDisplay {...args} />
    </Descriptions.Item>
  </Descriptions>
);

export const Default: Story = {
  render: Wrapper,
  args: {
    housing: {
      address: '123 Main St, Springfield',
    },
  },
};

export const Empty: Story = {
  render: Wrapper,
  args: {
    housing: null,
  },
};
