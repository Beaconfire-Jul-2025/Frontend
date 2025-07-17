import type { Meta, StoryObj } from '@storybook/react-webpack5';
import HouseDisplay from './index';

const meta: Meta<typeof HouseDisplay> = {
  title: 'Information/HouseDisplay',
  component: HouseDisplay,
};

export default meta;

type Story = StoryObj<typeof HouseDisplay>;

const Wrapper = (args: any) => <HouseDisplay {...args} />;

export const Default: Story = {
  render: Wrapper,
  args: {
    housing: {
      address: '123 Main St, Springfield',
      roommates: [
        {
          firstName: 'John',
          lastName: 'Doe',
          middleName: 'A.',
          preferredName: 'Johnny',
          avatarPath: 'https://randomuser.me/api/portraits/men/1.jpg',
          email: 'john.doe@example.com',
          cellPhone: '555-1234',
          alternatePhone: '555-5678',
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          preferredName: '',
          avatarPath: 'https://randomuser.me/api/portraits/women/2.jpg',
          email: 'jane.smith@example.com',
          cellPhone: '555-8765',
        },
      ],
    },
  },
};

export const Empty: Story = {
  render: Wrapper,
  args: {
    housing: null,
  },
};
