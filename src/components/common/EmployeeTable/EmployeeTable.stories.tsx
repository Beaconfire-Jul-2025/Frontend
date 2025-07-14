import type { Meta, StoryObj } from "@storybook/react";
import EmployeeTable from "./EmployeeTable";
import { handlers } from "@/mocks/handlers";

const meta: Meta<typeof EmployeeTable> = {
  title: "Components/EmployeeTable",
  component: EmployeeTable,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers,
    },
  },
  argTypes: {
    view: {
      control: { type: "select" },
      options: ["roommate", "application", "profile", "visa", "hiring"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Roommate: Story = {
  args: {
    view: "roommate",
  },
};

export const Application: Story = {
  args: {
    view: "application",
  },
};

export const Profile: Story = {
  args: {
    view: "profile",
  },
};

export const Visa: Story = {
  args: {
    view: "visa",
  },
};

export const Hiring: Story = {
  args: {
    view: "hiring",
  },
};

// Interactive story for testing different views
export const Interactive: Story = {
  args: {
    view: "roommate",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls panel to switch between different table views and see how the columns change.",
      },
    },
  },
};
