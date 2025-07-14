import React from "react";
import type { ActionType } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { queryEmployee } from "@/api/employee";
import type { View } from "@/api/employee";
import { useColumns } from "@/hooks/useColumns";

interface Props {
  view: View;
  actionRef?: React.MutableRefObject<ActionType | undefined>;
}

const EmployeeTable: React.FC<Props> = ({ view, actionRef }) => {
  const columns = useColumns(view);

  return (
    <ProTable
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      request={async (params, sorter, filter) => {
        const { data, success, total } = await queryEmployee({
          ...params,
          sorter,
          filter,
          view,
        });
        return { data, success, total };
      }}
      pagination={{ showSizeChanger: true }}
      search={
        view === "profile" || view === "visa"
          ? { filterType: "light", defaultCollapsed: false }
          : false
      }
      className="bg-white"
    />
  );
};

export default EmployeeTable;
