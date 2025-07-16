import React from 'react';
import IdentityDisplay from './index';
import type { IdentityInfo } from './data';

export default {
  title: 'Information/IdentityDisplay',
  component: IdentityDisplay,
};

const info: IdentityInfo = {
  ssn: '123-45-6789',
  gender: 'Female',
  dob: '1985-05-15',
};

export const Default = () => <IdentityDisplay info={info} />;

