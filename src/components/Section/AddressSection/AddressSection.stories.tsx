import React from 'react';
import {AddressSection} from './index';
import type {Address} from '@/components/Information/AddressDisplay/data.d';

export default {
  title: 'Components/Section/AddressSection',
  component: AddressSection,
};

const sampleAddresses: Address[] = [
  {
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    type: 'PRIMARY',
  },
];

export const Default = () => (
  <AddressSection addresses={sampleAddresses} editable={false}/>
);

export const Loading = () => (
  <AddressSection addresses={sampleAddresses} loading={true} editable={false}/>
);

export const Editable = () => (
  <AddressSection addresses={sampleAddresses} editable={true}/>
);

export const MultipleAddresses = () => (
  <AddressSection addresses={[
    ...sampleAddresses,
    {
      addressLine1: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      type: 'SECONDARY',
    },
  ]} editable={true}/>
);

export const EmptyState = () => (
  <AddressSection addresses={[]} editable={true}/>
);
