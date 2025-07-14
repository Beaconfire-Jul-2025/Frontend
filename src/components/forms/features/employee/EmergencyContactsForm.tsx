// src/components/forms/EmergencyContactsForm.tsx
import React, { useState } from "react";
import { Button, Card, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProFormList } from "@ant-design/pro-components";
import { ContactPersonForm } from "../../common/ContactPersonForm.tsx";
import type { FormData } from "@/types/employee.ts";

interface EmergencyContactsFormProps {
  initialValues?: Partial<FormData>;
}

export const EmergencyContactsForm: React.FC<EmergencyContactsFormProps> = ({
  initialValues,
}) => {
  const [emergencyContacts] = useState(initialValues?.EmergencyContacts || []);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Emergency Contacts
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Please provide at least one emergency contact. You can add up to 3
          emergency contacts.
        </p>
      </div>

      <ProFormList
        name="EmergencyContacts"
        min={1}
        max={3}
        creatorButtonProps={{
          creatorButtonText: "Add Emergency Contact",
          icon: <PlusOutlined />,
          type: "dashed",
          size: "large",
          style: { width: "100%", marginBottom: 16 },
        }}
        copyIconProps={false}
        deleteIconProps={{
          tooltipText: "Remove this emergency contact",
        }}
        itemContainerRender={(doms, listMeta) => (
          <Card
            size="small"
            title={`Emergency Contact ${listMeta.index + 1}`}
            style={{ marginBottom: 16 }}
            extra={
              listMeta.index > 0 && (
                <Popconfirm
                  title="Are you sure you want to remove this emergency contact?"
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
              )
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
            showAlternatePhone={true}
          />
        )}
      </ProFormList>

      {emergencyContacts.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500">
            <PlusOutlined className="text-2xl mb-2" />
            <p>No emergency contacts added yet</p>
            <p className="text-sm">
              Click "Add Emergency Contact" to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
