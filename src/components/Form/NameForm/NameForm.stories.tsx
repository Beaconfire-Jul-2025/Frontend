import React from 'react';
import { NameForm } from './index';
import type { NameData } from './data';

export default {
  title: 'Form/NameForm',
  component: NameForm,
};

const baseData: NameData = {
  firstName: 'John',
  middleName: 'H.',
  lastName: 'Doe',
  preferredName: 'Johnny',
};

export const Default = () => (
  <NameForm
    initialValues={baseData}
    onFinish={() => {}}
    onCancel={() => {}}
  />
);

export const NoMiddleOrPreferred = () => (
  <NameForm
    initialValues={{ firstName: 'Jane', lastName: 'Smith' }}
    onFinish={() => {}}
    onCancel={() => {}}
  />
);
