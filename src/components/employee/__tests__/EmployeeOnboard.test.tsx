import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";

import EmployeeOnboard from "@/pages/employee/EmployeeOnboard.tsx";
import { useFormData } from "@/hooks/useFormData.ts";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import antd from "antd";
import type { OnboardingData } from "@/types/employee";

vi.mock("@/hooks/useOnboardingData");
vi.mock("@/hooks/useAvatarUpload");
vi.mock("antd", async (importOriginal) => {
  const originalAntd = await importOriginal<typeof antd>();
  return {
    ...originalAntd,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe("EmployeeOnboard Component", () => {
  const mockLoadOnboardingData = vi.fn<[], OnboardingData>();
  const mockUpdateOnboardingData = vi.fn<[OnboardingData], Promise<boolean>>();
  const mockSetAvatarUrl = vi.fn<[string], void>();

  const renderComponent = () => {
    return render(
      <ConfigProvider locale={enUS}>
        <EmployeeOnboard />
      </ConfigProvider>,
    );
  };

  beforeEach(() => {
    vi.mocked(useFormData).mockReturnValue({
      loadOnboardingData: mockLoadOnboardingData,
      updateOnboardingData: mockUpdateOnboardingData,
    });

    vi.mocked(useAvatarUpload).mockReturnValue({
      avatarUrl: "http://example.com/avatar.png",
      setAvatarUrl: mockSetAvatarUrl,
    });

    // Mock initial data if needed, but for a fresh form, it's often empty
    mockLoadOnboardingData.mockReturnValue({});
    mockUpdateOnboardingData.mockResolvedValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it.skip("should render the first step and load initial data", () => {
    renderComponent();
    expect(screen.getByText("Name Information")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your first name"),
    ).toBeInTheDocument();
    expect(mockLoadOnboardingData).toHaveBeenCalledTimes(1);
  });

  it.skip("should display validation errors if required fields are empty", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(
      await screen.findByText("Please enter your first name"),
    ).toBeInTheDocument();
    expect(mockUpdateOnboardingData).not.toHaveBeenCalled();
  });

  it.skip("should allow a user to complete all steps and submit the form", async () => {
    const user = userEvent.setup();
    // Mock Date.now consistently for predictable IDs
    vi.spyOn(Date, "now").mockReturnValue(1720576800000); // July 9, 2025, 12:00:00 PM UTC

    renderComponent();

    // Step 1: Name Information
    const nameData = { FirstName: "Jane", LastName: "Smith" };
    await user.type(
      screen.getByPlaceholderText("Enter your first name"),
      nameData.FirstName,
    );
    await user.type(
      screen.getByPlaceholderText("Enter your last name"),
      nameData.LastName,
    );
    await user.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() =>
      expect(mockUpdateOnboardingData).toHaveBeenCalledWith(
        expect.objectContaining(nameData),
      ),
    );

    // Step 2: Contact Information
    await screen.findByText("Contact Information");
    const contactData = {
      Email: "jane.smith@example.com",
      CellPhone: "5551234567",
    };
    await user.type(
      screen.getByPlaceholderText("Enter your email address"),
      contactData.Email,
    );
    await user.type(
      screen.getByPlaceholderText("Enter your cell phone number"),
      contactData.CellPhone,
    );
    await user.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() =>
      expect(mockUpdateOnboardingData).toHaveBeenCalledWith(
        expect.objectContaining(contactData),
      ),
    );

    // Step 3: Personal Information
    await screen.findByText("Personal Information");
    const personalData = { SSN: "123-45-6789" };
    await user.type(
      screen.getByPlaceholderText("Enter your SSN (XXX-XX-XXXX)"),
      personalData.SSN,
    );
    await user.type(
      screen.getByPlaceholderText("Select your date of birth"),
      "05/20/1990{enter}",
    );
    await user.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() =>
      expect(mockUpdateOnboardingData).toHaveBeenCalledWith(
        expect.objectContaining({
          SSN: personalData.SSN,
          DOB: dayjs("05/20/1990").toISOString(), // Match the ISO string format from logs
        }),
      ),
    );

    // Step 4: Address Information (Final Step)
    await screen.findByText("Address Information");
    const addressData = {
      AddressLine1: "123 Main St",
      City: "Anytown",
      State: "CA",
      ZipCode: "90210",
    };
    await user.type(
      screen.getByPlaceholderText("Enter your street address"),
      addressData.AddressLine1,
    );
    await user.type(
      screen.getByPlaceholderText("Enter your city"),
      addressData.City,
    );
    await user.type(
      screen.getByPlaceholderText("Enter your state"),
      addressData.State,
    );
    await user.type(
      screen.getByPlaceholderText("Enter your ZIP code"),
      addressData.ZipCode,
    );
    await user.click(screen.getByRole("button", { name: "Finish" }));

    vi.restoreAllMocks();
  }, 20000);
});
