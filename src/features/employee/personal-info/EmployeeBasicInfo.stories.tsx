import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import EmployeeBasicInfo from "./EmployeeBasicInfo";
import {
  employeeBasicInfoPayload,
  employeeBasicInfoVisaPayload,
  employeeBasicInfoNoLicensePayload,
} from "@/mocks/payloads/employee/basicInfo";

const meta: Meta<typeof EmployeeBasicInfo> = {
  title: "Features/Employee/EmployeeBasicInfo",
  component: EmployeeBasicInfo,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Employee basic information display and editing component. Shows personal details, addresses, contact info, employment details, and emergency contacts.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "24px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with complete employee data
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/employee/profile", () =>
          HttpResponse.json(employeeBasicInfoPayload),
        ),
      ],
    },
  },
};

// Employee with visa/work authorization
export const WithVisa: Story = {
  parameters: {
    docs: {
      description: {
        story: "Employee with H1-B visa status and work authorization details.",
      },
    },
    msw: {
      handlers: [
        http.get("/api/employee/profile", () =>
          HttpResponse.json(employeeBasicInfoVisaPayload),
        ),
      ],
    },
  },
};

// Employee without driver license
export const WithoutDriverLicense: Story = {
  parameters: {
    docs: {
      description: {
        story: "Employee who does not have a driver license.",
      },
    },
    msw: {
      handlers: [
        http.get("/api/employee/profile", () =>
          HttpResponse.json(employeeBasicInfoNoLicensePayload),
        ),
      ],
    },
  },
};

// Loading state
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: "Loading state while fetching employee data.",
      },
    },
    msw: {
      handlers: [
        http.get("/api/employee/profile", () =>
          HttpResponse.json(employeeBasicInfoPayload, {
            delay: "infinite",
          }),
        ),
      ],
    },
  },
};

// Error state
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: "Error state when failing to fetch employee data.",
      },
    },
    msw: {
      handlers: [
        http.get("/api/employee/profile", () =>
          HttpResponse.json(
            { error: "Failed to fetch employee data" },
            { status: 500 },
          ),
        ),
      ],
    },
  },
};

// Minimal employee data
export const MinimalData: Story = {
  parameters: {
    docs: {
      description: {
        story: "Employee with minimal required data only.",
      },
    },
    msw: {
      handlers: [
        http.get("/api/employee/profile", () =>
          HttpResponse.json({
            ...employeeBasicInfoPayload,
            MiddleName: undefined,
            PreferredName: undefined,
            WorkPhone: undefined,
            EndDate: undefined,
            Addresses: [employeeBasicInfoPayload.addresses[0]], // Only primary address
            EmergencyContacts: [employeeBasicInfoPayload.emergencyContacts[0]], // Only one contact
            References: [],
            PersonalDocuments: [],
          }),
        ),
      ],
    },
  },
};
