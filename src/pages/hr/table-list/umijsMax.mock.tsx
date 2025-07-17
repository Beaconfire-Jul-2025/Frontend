/* Shared mock for @umijs/max exports */
import React from 'react';

export const FormattedMessage = ({ id, defaultMessage, ...props }: any) => (
  <span {...props}>{defaultMessage || id}</span>
);
export const useIntl = () => ({
  formatMessage: ({ id, defaultMessage }: any) => defaultMessage || id,
});
export const useRequest = (service: any, options: any) => ({
  run: async (...args: any[]) => {},
  loading: false,
});
