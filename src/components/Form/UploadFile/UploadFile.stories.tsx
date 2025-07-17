import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import type { FilePurpose } from './data';
import UploadFile from './index';

// Use the mock service for Storybook
import { getPreSignedUrl } from './service.storybook';

const meta: Meta<typeof UploadFile> = {
  title: 'Form/UploadFile',
  component: UploadFile,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

type Story = StoryObj<typeof UploadFile>;

const Template = (args: any) => <UploadFile {...args} />;

export const SingleImage: Story = {
  render: Template,
  args: {
    value: undefined,
    onChange: (val: any) => {
      // eslint-disable-next-line no-console
      console.log('onChange', val);
    },
    fileLimit: 1,
    purpose: 'AVATAR' as FilePurpose,
    disabled: false,
  },
};

export const MultipleFiles: Story = {
  render: Template,
  args: {
    value: [],
    onChange: (val: any) => {
      // eslint-disable-next-line no-console
      console.log('onChange', val);
    },
    fileLimit: 3,
    purpose: 'DOCUMENT' as FilePurpose,
    disabled: false,
  },
};
