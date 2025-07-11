// src/utils/formDataHelpers.ts
import dayjs from "dayjs";
import type { EmergencyContact, FormData, Reference } from "@/types/employee";

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

export const handleEmergencyContacts = (
  values: FormData,
  currentData: FormData,
): FormData => {
  const updatedData = { ...currentData };

  if (values.EmergencyContacts && values.EmergencyContacts.length > 0) {
    updatedData.EmergencyContacts = values.EmergencyContacts.filter(
      (contact): contact is EmergencyContact =>
        contact.FirstName !== undefined &&
        contact.LastName !== undefined &&
        contact.Email !== undefined &&
        contact.CellPhone !== undefined &&
        contact.Relationship !== undefined &&
        contact.Address !== undefined,
    );
  } else {
    updatedData.EmergencyContacts = [];
  }

  return updatedData;
};

export const handleReferences = (
  values: FormData,
  currentData: FormData,
): FormData => {
  const updatedData = { ...currentData };

  if (values.References && values.References.length > 0) {
    updatedData.References = values.References.filter(
      (reference): reference is Reference =>
        reference.FirstName !== undefined &&
        reference.LastName !== undefined &&
        reference.Email !== undefined &&
        reference.Phone !== undefined &&
        reference.Relationship !== undefined &&
        reference.Address !== undefined,
    );
  } else {
    updatedData.References = [];
  }

  return updatedData;
};
