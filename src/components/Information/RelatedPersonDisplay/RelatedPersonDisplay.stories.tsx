import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { RelatedPerson } from './data.d';
import RelatedPersonDisplay from './index';

const samplePerson: RelatedPerson = {
  firstName: 'Jane',
  lastName: 'Doe',
  middleName: 'A.',
  relationship: 'Sister',
  cellPhone: '123-456-7890',
  alternatePhone: '098-765-4321',
  email: 'jane.doe@example.com',
  address: {
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4B',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
  },
};

const meta: Meta<typeof RelatedPersonDisplay> = {
  title: 'Information/RelatedPersonDisplay',
  component: RelatedPersonDisplay,
};
export default meta;

type Story = StoryObj<typeof RelatedPersonDisplay>;

export const Default: Story = {
  args: {
    person: samplePerson,
  },
};
