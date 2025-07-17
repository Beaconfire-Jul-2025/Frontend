import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import type { Employee, EmployeeTableView } from './data';

// Conditional import for Storybook compatibility
let fetchEmployees: typeof import('./service').fetchEmployees;
if (process.env.STORYBOOK === 'true') {
  fetchEmployees = async () => {
    // Use mock data for Storybook
    const mock = require('./_mock').default;
    return mock[0].response();
  };
} else {
  fetchEmployees = require('./service').fetchEmployees;
}

import { Avatar } from 'antd';
import { SecureViewAction, VisaActions } from '../common/EmployeeTable/actions';

export interface EmployeeTableProps {
  view: EmployeeTableView;
  onRowClick?: (record: Employee) => void;
}

const getColumns = (view: EmployeeTableView): ProColumns<Employee>[] => {
  switch (view) {
    case 'visa':
      return [
        {
          title: 'Avatar',
          dataIndex: 'avatarPath',
          render: (_, record) =>
            record.avatarPath ? <Avatar src={record.avatarPath} /> : null,
          hideInSearch: true,
        },
        { title: 'Name', dataIndex: 'fullName', filterSearch: true },
        { title: 'Email', dataIndex: 'email', hideInSearch: true },
        { title: 'Visa Type', dataIndex: 'visaType' },
        {
          title: 'Expiration',
          dataIndex: 'visaExpirationDate',
          valueType: 'date',
        },
        { title: 'Days Left', dataIndex: 'daysLeft', sorter: true },
        {
          title: 'Actions',
          valueType: 'option',
          render: (_, record) => <VisaActions record={record} />,
        },
      ];
    case 'application':
    case 'hiring':
      return [
        {
          title: 'Avatar',
          dataIndex: 'avatarPath',
          render: (_, record) =>
            record.avatarPath ? <Avatar src={record.avatarPath} /> : null,
          hideInSearch: true,
        },
        { title: 'Name', dataIndex: 'fullName', filterSearch: true },
        { title: 'Email', dataIndex: 'email', hideInSearch: true },
        { title: 'Type', dataIndex: 'applicationType', valueType: 'select' },
        {
          title: 'Status',
          dataIndex: 'applicationStatus',
          valueType: 'select',
        },
        {
          title: 'Last Modified',
          dataIndex: 'lastModifiedDate',
          valueType: 'dateTime',
          sorter: true,
        },
        {
          title: 'Actions',
          valueType: 'option',
          render: (_, record) => (
            <SecureViewAction userId={record.userId} mode="hr" />
          ),
        },
      ];
    case 'profile':
      return [
        {
          title: 'Avatar',
          dataIndex: 'avatarPath',
          render: (_, record) =>
            record.avatarPath ? <Avatar src={record.avatarPath} /> : null,
          hideInSearch: true,
        },
        { title: 'Name', dataIndex: 'fullName', filterSearch: true },
        { title: 'Email', dataIndex: 'email', hideInSearch: true },
        { title: 'SSN', dataIndex: 'ssnMasked', hideInSearch: true },
        {
          title: 'Start Date',
          dataIndex: 'startDate',
          valueType: 'date',
          sorter: true,
        },
        { title: 'Visa Type', dataIndex: 'visaType', hideInSearch: true },
        {
          title: 'Actions',
          valueType: 'option',
          render: (_, record) => (
            <SecureViewAction userId={record.userId} mode="hr" />
          ),
        },
      ];
    case 'roommate':
      return [
        {
          title: 'Avatar',
          dataIndex: 'avatarPath',
          render: (_, record) =>
            record.avatarPath ? <Avatar src={record.avatarPath} /> : null,
          hideInSearch: true,
        },
        { title: 'Name', dataIndex: 'fullName', filterSearch: true },
        { title: 'Phone', dataIndex: 'phone', hideInSearch: true },
        { title: 'Email', dataIndex: 'email', hideInSearch: true },
        {
          title: 'Actions',
          valueType: 'option',
          render: (_, record) => (
            <SecureViewAction userId={record.userId} mode="roommate" />
          ),
        },
      ];
    default:
      return [];
  }
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ view, onRowClick }) => {
  return (
    <ProTable<Employee>
      rowKey="userId"
      columns={getColumns(view)}
      request={async (params, sorter, filter) => {
        // Convert AntD params to API params
        const query: Record<string, any> = {
          page: params.current ? params.current - 1 : 0,
          size: params.pageSize || 10,
        };
        if (params.fullName) query.name = params.fullName;
        if (params.applicationStatus) query.status = params.applicationStatus;
        if (sorter && sorter.field && sorter.order) {
          query.sort = `${sorter.field},${sorter.order === 'ascend' ? 'asc' : 'desc'}`;
        }
        // Add more filters as needed
        const res = await fetchEmployees(query);
        return {
          data: res.data.list,
          success: res.success,
          total: res.data.total,
        };
      }}
      pagination={{ showSizeChanger: true }}
      search={
        view === 'profile' || view === 'visa'
          ? { filterType: 'light', defaultCollapsed: false }
          : false
      }
      onRow={
        onRowClick
          ? (record) => ({ onClick: () => onRowClick(record) })
          : undefined
      }
      className="bg-white"
    />
  );
};

export default EmployeeTable;
