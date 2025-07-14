import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "Components/EmployeeProfile/Components/SectionHeader",
  component: SectionHeader,
  argTypes: {
    onEdit: { action: "edit clicked" },
    onSave: { action: "save clicked" },
    onCancel: { action: "cancel clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const View: Story = {
  args: {
    canEdit: true,
    isEditing: false,
  },
};

export const Editing: Story = {
  args: {
    canEdit: true,
    isEditing: true,
  },
};

export const CannotEdit: Story = {
  args: {
    canEdit: false,
    isEditing: false,
  },
};
