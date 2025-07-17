import type { Meta, Story } from '@storybook/react';
import React from 'react';
import FacilityReport from './FacilityReport';

export default {
  title: 'Employee/Housing/FacilityReport',
  component: FacilityReport,
} as Meta;

const Template: Story = (args) => <FacilityReport {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithReports = Template.bind({});
WithReports.args = {};
// For real data, mock fetch or use MSW in Storybook config

export const Loading = Template.bind({});
Loading.args = {};
// To simulate loading, you can mock the loading state in the component
