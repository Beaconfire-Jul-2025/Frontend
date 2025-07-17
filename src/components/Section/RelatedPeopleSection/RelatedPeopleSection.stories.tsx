import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { RelatedPeopleSectionProps } from './data.d';
import RelatedPeopleSection from './index';

const samplePeople = [
  {
    firstName: 'John',
    lastName: 'Doe',
    relationship: 'Colleague',
    email: 'john.doe@example.com',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    relationship: 'Manager',
    email: 'jane.smith@example.com',
  },
];

const meta: Meta<RelatedPeopleSectionProps> = {
  title: 'Section/RelatedPeopleSection',
  component: RelatedPeopleSection,
};
export default meta;

export const Default: StoryObj<RelatedPeopleSectionProps> = {
  args: {
    people: samplePeople,
    loading: false,
    editable: true,
    title: 'Related People',
  },
};

export const Empty: StoryObj<RelatedPeopleSectionProps> = {
  args: {
    people: [],
    loading: false,
    editable: true,
    title: 'Related People',
  },
};
