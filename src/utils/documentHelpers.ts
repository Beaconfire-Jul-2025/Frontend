import dayjs from "dayjs";
import type { FormData, PersonalDocument } from "@/types/employee";

export const handlePersonalDocuments = (
  values: FormData,
  currentData: FormData,
): FormData => {
  const updatedData = { ...currentData };
  if (values.PersonalDocuments && values.PersonalDocuments.length > 0) {
    const driverLicenseDocFromForm = values.PersonalDocuments.find(
      (doc) => doc.Type === "DRIVER_LICENSE_PROOF",
    );

    if (driverLicenseDocFromForm) {
      const docPath =
        driverLicenseDocFromForm.File?.url ??
        driverLicenseDocFromForm.File?.response?.url ??
        driverLicenseDocFromForm.Path;

      if (docPath) {
        const driverLicenseDoc: PersonalDocument = {
          Type: "DRIVER_LICENSE_PROOF",
          Path: docPath,
          Title: driverLicenseDocFromForm.Title ?? "Driver License Front",
          Comment:
            driverLicenseDocFromForm.Comment ?? "Scan of driver's license",
          CreateDate:
            driverLicenseDocFromForm.CreateDate instanceof dayjs
              ? driverLicenseDocFromForm.CreateDate.toISOString()
              : (driverLicenseDocFromForm.CreateDate ??
                new Date().toISOString()),
        };

        updatedData.PersonalDocuments = (
          updatedData.PersonalDocuments ?? []
        ).filter(
          (doc: PersonalDocument) => doc.Type !== "DRIVER_LICENSE_PROOF",
        );

        updatedData.PersonalDocuments.push(driverLicenseDoc);
      }
    }
  }
  return updatedData;
};
