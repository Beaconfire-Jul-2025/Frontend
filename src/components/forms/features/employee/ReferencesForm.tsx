// src/components/forms/ReferencesForm.tsx
import React, { useState } from "react";
import { Button, Card, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProFormList } from "@ant-design/pro-components";
import { ContactPersonForm } from "../../common/ContactPersonForm.tsx";
import type { FormData } from "@/types/employee.ts";

interface ReferencesFormProps {
  initialValues?: Partial<FormData>;
}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({
  initialValues,
}) => {
  const [references] = useState(initialValues?.References || []);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">References</h3>
        <p className="text-gray-600 text-sm mb-4">
          References are optional but recommended. You can add up to 5
          references.
        </p>
      </div>

      <ProFormList
        name="References"
        min={0}
        max={5}
        creatorButtonProps={{
          creatorButtonText: "Add Reference",
          icon: <PlusOutlined />,
          type: "dashed",
          size: "large",
          style: { width: "100%", marginBottom: 16 },
        }}
        copyIconProps={false}
        deleteIconProps={{
          tooltipText: "Remove this reference",
        }}
        itemContainerRender={(doms, listMeta) => (
          <Card
            size="small"
            title={`Reference ${listMeta.index + 1}`}
            style={{ marginBottom: 16 }}
            extra={
              <Popconfirm
                title="Are you sure you want to remove this reference?"
                onConfirm={() => listMeta.action.remove(listMeta.index)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                >
                  Remove
                </Button>
              </Popconfirm>
            }
          >
            {doms}
          </Card>
        )}
      >
        {() => (
          <ContactPersonForm
            fieldPrefix={[]}
            title=""
            showPhone={true}
            showAlternatePhone={false}
          />
        )}
      </ProFormList>

      {references.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500">
            <PlusOutlined className="text-2xl mb-2" />
            <p>No references added yet</p>
            <p className="text-sm">Click "Add Reference" to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};
