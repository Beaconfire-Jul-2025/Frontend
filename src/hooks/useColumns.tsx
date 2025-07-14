import type { ProColumns } from "@ant-design/pro-components";
import { Space } from "antd";
import type { View } from "@/api/employee";
import {
  VisaActions,
  SecureViewAction,
} from "@/components/common/EmployeeTable/actions";

interface EmployeeRecord {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  [key: string]: any;
}

export const useColumns = (view: View): ProColumns<EmployeeRecord>[] => {
  switch (view) {
    case "roommate":
      return [
        {
          title: "Name",
          dataIndex: "preferredName",
          render: (_, r) => r.preferredName ?? `${r.firstName} ${r.lastName}`,
        },
        { title: "Phone", dataIndex: "phone", hideInSearch: true },
        {
          title: "Actions",
          valueType: "option",
          render: (_, record) => (
            <Space>
              <SecureViewAction record={record} mode="roommate" />
            </Space>
          ),
        },
      ];

    case "application":
    case "hiring":
      return [
        {
          title: "Name",
          dataIndex: "legalName",
          render: (_, r) =>
            `${r.firstName} ${r.middleName ?? ""} ${r.lastName}`,
        },
        { title: "Type", dataIndex: "applicationType", valueType: "select" },
        { title: "Status", dataIndex: "status", valueType: "select" },
        {
          title: "Last Modified",
          dataIndex: "lastModificationDate",
          valueType: "dateTime",
          sorter: true,
        },
        {
          title: "Actions",
          valueType: "option",
          render: (_, record) => (
            <Space>
              <SecureViewAction record={record} mode="hr" />
            </Space>
          ),
        },
      ];

    case "profile":
      return [
        {
          title: "Name",
          dataIndex: "legalName",
          render: (_, r) =>
            `${r.firstName} ${r.middleName ?? ""} ${r.lastName}`,
          filterSearch: true,
        },
        { title: "SSN", dataIndex: "ssn" },
        {
          title: "Start Date",
          dataIndex: "startDate",
          valueType: "date",
          sorter: true,
        },
        { title: "Visa Status", dataIndex: "visaStatus" },
        {
          title: "Actions",
          valueType: "option",
          render: (_, record) => (
            <Space>
              <SecureViewAction record={record} mode="hr" />
            </Space>
          ),
        },
      ];

    case "visa":
      return [
        {
          title: "Name",
          dataIndex: "legalName",
          render: (_, r) => r.legalName || `${r.firstName} ${r.lastName}`,
          filterSearch: true,
        },
        { title: "Work Authorization", dataIndex: "workAuthorization" },
        {
          title: "Expiration Date",
          dataIndex: "expirationDate",
          valueType: "date",
          sorter: true,
        },
        {
          title: "Days Left",
          dataIndex: "daysLeft",
          sorter: true,
          render: (dom) => <span className="font-semibold">{dom}</span>,
        },
        {
          title: "Actions",
          valueType: "option",
          render: (_, record) => (
            <Space>
              <VisaActions record={record} />
              <SecureViewAction record={record} mode="hr" />
            </Space>
          ),
        },
      ];

    default:
      return [];
  }
};
