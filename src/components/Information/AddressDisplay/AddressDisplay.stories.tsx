import type {Meta, StoryObj} from '@storybook/react';
import {AddressDisplay} from './index';

const meta: Meta<typeof AddressDisplay> = {
  title: 'Components/Information/AddressDisplay',
  component: AddressDisplay,
  tags: ['autodocs'],
  argTypes: {
    address: {
      description: 'The address object to display',
      control: 'object',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof AddressDisplay>;

export const PrimaryAddress: Story = {
  args: {
    address: {
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      type: 'PRIMARY',
    },
  },
};

export const SecondaryAddress: Story = {
  args: {
    address: {
      addressLine1: '456 Oak Ave',
      city: 'Someville',
      state: 'NY',
      zipCode: '10001',
      type: 'SECONDARY',
    },
  },
};

export const NoAddressLine2: Story = {
  args: {
    address: {
      addressLine1: '789 Pine Ln',
      city: 'Smallville',
      state: 'TX',
      zipCode: '75001',
      type: 'PRIMARY',
    },
  },
};

export const LongAddress: Story = {
  args: {
    address: {
      addressLine1: '1234 This Is A Very Long Street Name That Might Wrap Around',
      addressLine2: 'Unit 100 And A Sub-Suite Number',
      city: 'Metropolitan City With A Really Long Name',
      state: 'WA',
      zipCode: '98004-1234',
      type: 'SECONDARY',
    },
  },
};

export const CustomTypeAddress: Story = {
  args: {
    address: {
      addressLine1: '10 Downing St',
      city: 'London',
      state: 'ENG',
      zipCode: 'SW1A 2AA',
      type: 'BILLING',
    },
  },
};

export const AddressWithoutType: Story = {
  args: {
    address: {
      addressLine1: '888 Park Blvd',
      city: 'Greenwood',
      state: 'CO',
      zipCode: '80111',
    },
  },
};

export const AddressWithUndefinedType: Story = {
  args: {
    address: {
      addressLine1: '999 Lake St',
      city: 'Blueville',
      state: 'FL',
      zipCode: '33101',
      type: undefined,
    },
  },
};

export const AddressWithNullType: Story = {
  args: {
    address: {
      addressLine1: '777 Mountain Rd',
      city: 'Summit',
      state: 'AZ',
      zipCode: '85001',
      type: null as any,
    },
  },
};
