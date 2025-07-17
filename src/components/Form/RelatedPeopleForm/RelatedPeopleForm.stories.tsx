import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import RelatedPeopleForm from './index';

const meta: Meta<typeof RelatedPeopleForm> = {
  title: 'Form/RelatedPeopleForm',
  component: RelatedPeopleForm,
};

export default meta;

export const Default: StoryObj<typeof RelatedPeopleForm> = {
  render: () => <RelatedPeopleForm />,
};

export const Disabled: StoryObj<typeof RelatedPeopleForm> = {
  render: () => <RelatedPeopleForm disabled />,
};

export const CustomMinMax: StoryObj<typeof RelatedPeopleForm> = {
  render: () => <RelatedPeopleForm minPeople={2} maxPeople={5} />,
};
