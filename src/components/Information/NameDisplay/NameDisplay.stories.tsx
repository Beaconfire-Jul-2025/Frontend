import React from 'react';
import { NameDisplay } from './index';
import type { NameData } from './data';

export default {
  title: 'Information/NameDisplay',
  component: NameDisplay,
};

const baseData: NameData = {
  firstName: 'John',
  middleName: 'H.',
  lastName: 'Doe',
  preferredName: 'Johnny',
};

export const Default = () => <NameDisplay data={baseData} />;

export const NoMiddleOrPreferred = () => (
  <NameDisplay data={{ firstName: 'Jane', lastName: 'Smith' }} />
);

export const OnlyFirstAndLast = () => (
  <NameDisplay data={{ firstName: 'Alice', lastName: 'Brown' }} />
);
