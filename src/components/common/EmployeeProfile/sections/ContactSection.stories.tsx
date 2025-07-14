import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "antd";
import { ContactSection } from "./ContactSection";
import { employeeBasicInfoPayload } from "@/mocks/payloads/employee/basicinfo";

const meta: Meta<typeof ContactSection> = {
  title: "Components/EmployeeProfile/Sections/ContactSection",
  component: ContactSection,
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
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

const baseArgs = {
  employee: employeeBasicInfoPayload,
  onEdit: () => alert("Edit contact"),
  onSave: () => alert("Save contact"),
  onCancel: () => alert("Cancel contact"),
};

export const View: Story = {
  args: {
    ...baseArgs,
    mode: "hr",
    isEditing: false,
  },
};

export const EmployeeView: Story = {
  args: {
    ...baseArgs,
    mode: "employee",
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

export const NoWorkPhone: Story = {
  args: {
    ...baseArgs,
    employee: {
      ...employeeBasicInfoPayload,
      workPhone: undefined,
    },
    mode: "employee",
    isEditing: false,
  },
};
