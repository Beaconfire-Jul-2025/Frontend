import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import React from 'react';
import { SecureViewAction, VisaActions } from './components/actions';
import type { Employee, EmployeeTableView } from './data';

export interface EmployeeTableProps {
  view: EmployeeTableView;
  data: Employee[];
  total?: number;
  loading?: boolean;
  onRowClick?: (record: Employee) => void;
  pagination?: {
    current?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize?: number) => void;
  };
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
            <SecureViewAction
              userId={record.userId}
              mode="hr"
              redirectPath="/hr/employee/view"
            />
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

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  view,
  data,
  total,
  loading,
  onRowClick,
  pagination,
}) => {
  return (
    <ProTable<Employee>
      rowKey="userId"
      columns={getColumns(view)}
      dataSource={data}
      loading={loading}
      pagination={
        pagination
          ? {
              showSizeChanger: true,
              total,
              current: pagination.current,
              pageSize: pagination.pageSize,
              onChange: pagination.onChange,
            }
          : false
      }
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
