import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "antd";
import { AddressSection } from "./AddressSection";
import { employeeBasicInfoPayload } from "@/mocks/payloads/employee/basicInfo";

const meta: Meta<typeof AddressSection> = {
  title: "Components/EmployeeProfile/Sections/AddressSection",
  component: AddressSection,
  decorators: [
    (Story) => {
      const [form] = Form.useForm();
      return (
        <Form component={false} form={form}>
          <Story form={form} />
        </Form>
      );
    },
  ],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof AddressSection>;

const baseArgs = {
  employee: employeeBasicInfoPayload,
  onEdit: () => alert("Edit clicked"),
  onSave: () => alert("Save clicked"),
  onCancel: () => alert("Cancel clicked"),
};

export const View: Story = {
  args: {
    ...baseArgs,
    mode: "hr", // read-only for HR
    isEditing: false,
  },
};

export const EmployeeView: Story = {
  args: {
    ...baseArgs,
    mode: "employee", // editable for the employee
    isEditing: false,
  },
};

export const Editing: Story = {
  args: {
    ...baseArgs,
    mode: "employee",
    isEditing: true,
  },
};

export const NoSecondaryAddress: Story = {
  args: {
    ...baseArgs,
    employee: {
      ...employeeBasicInfoPayload,
      addresses: [
        {
          type: "PRIMARY",
          addressLine1: "1 Infinite Loop",
          city: "Cupertino",
          state: "CA",
          zipCode: "95014",
        },
      ],
    },
    isEditing: false,
  },
};
