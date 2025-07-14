import type { ProColumns } from "@ant-design/pro-components";
import { Space } from "antd";
import type { View } from "@/api/employee";
import { VisaActions } from "@/components/common/EmployeeTable/actions";

interface EmployeeRecord {
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  PreferredName?: string;
  [key: string]: any;
}

export const useColumns = (view: View): ProColumns<EmployeeRecord>[] => {
  switch (view) {
    case "roommate":
      return [
        {
          title: "Name",
          dataIndex: "preferredName",
          render: (_, r) => r.PreferredName ?? `${r.FirstName} ${r.LastName}`,
        },
        { title: "Phone", dataIndex: "phone", hideInSearch: true },
      ];

    case "application":
    case "hiring":
      return [
        {
          title: "Name",
          dataIndex: "legalName",
          render: (_, r) =>
            `${r.FirstName} ${r.MiddleName ?? ""} ${r.LastName}`,
        },
        { title: "Type", dataIndex: "applicationType", valueType: "select" },
        { title: "Status", dataIndex: "status", valueType: "select" },
        {
          title: "Last Modified",
          dataIndex: "lastModificationDate",
          valueType: "dateTime",
          sorter: true,
        },
      ];

    case "profile":
      return [
        {
          title: "Name",
          dataIndex: "legalName",
          render: (_, r) =>
            `${r.FirstName} ${r.MiddleName ?? ""} ${r.LastName}`,
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
      ];

    case "visa":
      return [
        {
          title: "Name",
          dataIndex: "legalName",
          render: (_, r) => `${r.FirstName} ${r.LastName}`,
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
            </Space>
          ),
        },
      ];

    default:
      return [];
  }
};
