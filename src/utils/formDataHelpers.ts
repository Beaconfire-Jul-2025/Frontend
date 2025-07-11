import dayjs from "dayjs";
import type { FormData } from "@/types/employee";

export const prepareFormDataForSave = (
  values: FormData,
): Partial<FormData> => ({
  ...values,
  DOB: values.DOB ? dayjs(values.DOB).toISOString() : undefined,
});

export const handleAddresses = (
  values: FormData,
  currentData: FormData,
): FormData => {
  const updatedData = { ...currentData };
  if (values.Addresses && values.Addresses.length > 0) {
    const primaryAddressFromForm = values.Addresses.find(
      (addr) => addr.Type === "PRIMARY",
    );

    if (primaryAddressFromForm) {
      const existingAddresses = updatedData.Addresses ?? [];
      const primaryIndex = existingAddresses.findIndex(
        (addr) => addr.Type === "PRIMARY",
      );

      if (primaryIndex >= 0) {
        existingAddresses[primaryIndex] = primaryAddressFromForm;
      } else {
        existingAddresses.push(primaryAddressFromForm);
      }
      updatedData.Addresses = existingAddresses;
    }
  } else {
    updatedData.Addresses ??= [];
  }
  return updatedData;
};

export const handleWorkAuthorization = (
  values: FormData,
  currentData: FormData,
): FormData => {
  const updatedData = { ...currentData };
  updatedData.WorkAuthorization = {
    IsUSCitizen: values.WorkAuthorization?.IsUSCitizen ?? true,
    GreenCardHolder: values.WorkAuthorization?.GreenCardHolder ?? false,
    Type: values.WorkAuthorization?.Type ?? "N/A",
    StartDate: values.WorkAuthorization?.StartDate
      ? dayjs(values.WorkAuthorization.StartDate).toISOString()
      : undefined,
    EndDate: values.WorkAuthorization?.EndDate
      ? dayjs(values.WorkAuthorization.EndDate).toISOString()
      : undefined,
    LastModificationDate: dayjs(
      values.WorkAuthorization?.LastModificationDate ?? new Date(),
    ).toISOString(),
  };
  return updatedData;
};

export const handleDriverLicense = (
  values: FormData,
  currentData: FormData,
): FormData => {
  const updatedData = { ...currentData };
  if (values.DriverLicense) {
    updatedData.DriverLicense = {
      ...values.DriverLicense,
      ExpirationDate: values.DriverLicense.ExpirationDate
        ? dayjs(values.DriverLicense.ExpirationDate).toISOString()
        : undefined,
    };
  } else {
    updatedData.DriverLicense = {
      HasLicense: false,
      LicenseNumber: undefined,
      ExpirationDate: undefined,
    };
  }
  return updatedData;
};
