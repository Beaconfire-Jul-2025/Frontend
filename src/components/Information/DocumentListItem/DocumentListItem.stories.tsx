import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { List } from 'antd';
import type { PersonalDocument } from '../../Section/PersonalDocumentsSection/data';
import DocumentListItem from './index';

const sampleDocs: PersonalDocument[] = [
  {
    type: 'PASSPORT',
    title: 'Passport',
    comment: 'Issued by US government',
    createDate: '2024-01-01',
    path: '/files/passport.pdf',
  },
  {
    type: 'DRIVER_LICENSE',
    title: 'Driver License',
    comment: 'California DL',
    createDate: '2023-06-15',
    path: '/files/dl.pdf',
  },
  {
    type: 'VISA',
    title: 'Visa',
    comment: 'US Work Visa',
    createDate: '2022-11-20',
    path: '/files/visa.pdf',
  },
  {
    type: 'PERSONAL_DOCUMENTS',
    title: 'Personal Document',
    comment: 'Other important document',
    createDate: '2021-05-10',
    path: '/files/personal.pdf',
  },
];

const meta: Meta<typeof DocumentListItem> = {
  title: 'Information/DocumentListItem',
  component: DocumentListItem,
};
export default meta;

type Story = StoryObj<typeof DocumentListItem>;

export const Default: Story = {
  render: () => (
    <List>
      {sampleDocs.map((doc) => (
        <DocumentListItem key={doc.title} doc={doc} />
      ))}
    </List>
  ),
};
