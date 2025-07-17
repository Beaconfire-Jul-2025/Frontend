import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { RelatedPerson } from '@/components/Information/RelatedPersonDisplay/data.d';
import RelatedPeopleDisplay from './index';

const meta: Meta<typeof RelatedPeopleDisplay> = {
  title: 'Information/RelatedPeopleDisplay',
  component: RelatedPeopleDisplay,
};
export default meta;

const people: RelatedPerson[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    relationship: 'Brother',
    cellPhone: '123-456-7890',
    email: 'john.doe@example.com',
    address: {
      addressLine1: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      type: 'PRIMARY',
    },
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    relationship: 'Mother',
    phone: '987-654-3210',
    address: {
      addressLine1: '456 Oak Ave',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      type: 'SECONDARY',
    },
  },
];

export const Default: StoryObj<typeof RelatedPeopleDisplay> = {
  args: {
    people,
    title: 'Related People',
  },
};

export const Empty: StoryObj<typeof RelatedPeopleDisplay> = {
  args: {
    people: [],
    title: 'Related People',
  },
};
