import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import { http, HttpResponse } from "msw";
import EmployeeProfile from "./EmployeeProfile";
import { employeeBasicInfoPayload } from "@/mocks/payloads/employee/basicInfo";
import { employeeHandlers } from "@/mocks/handlers/employee.ts";

const meta: Meta<typeof EmployeeProfile> = {
  title: "Components/EmployeeProfile/EmployeeProfile",
  component: EmployeeProfile,
  parameters: {
    layout: "fullscreen",
    msw: employeeHandlers,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HR_View: Story = {
  args: { employeeId: "emp001", mode: "hr" },
};

export const Employee_Edit: Story = {
  args: { employeeId: "emp001", mode: "employee" },
};

export const ProvidedData: Story = {
  args: {
    employee: employeeBasicInfoPayload,
    mode: "employee",
  },
};

export const Loading: Story = {
  args: { employeeId: "emp001", mode: "hr" },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/employee/profile", async () => {
          // 永远挂起，展示 loading
          await new Promise(() => {});
        }),
      ],
    },
  },
};

export const Error404: Story = {
  args: { employeeId: "bad-id", mode: "hr" },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/employee/profile", () =>
          HttpResponse.json({ message: "Not found" }, { status: 404 }),
        ),
      ],
    },
  },
};

export const EditAndCancelFlow: Story = {
  args: { employeeId: "emp001", mode: "employee" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const contactEditBtn = canvas.getAllByRole("button", {
      name: /edit/i,
    })[2];
    await userEvent.click(contactEditBtn);

    await waitFor(() =>
      expect(canvas.getByRole("button", { name: /save/i })).toBeInTheDocument(),
    );

    await userEvent.click(canvas.getByRole("button", { name: /cancel/i }));
    await userEvent.click(
      within(document.body).getByRole("button", { name: /ok/i }),
    );

    await waitFor(() =>
      expect(
        canvas.queryByRole("button", { name: /save/i }),
      ).not.toBeInTheDocument(),
    );
  },
};
