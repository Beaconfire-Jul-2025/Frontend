import { message } from "antd";

export const useDriverLicenseUpload = () => {
  const beforeUpload = (file: File): boolean => {
    const isValidType =
      file.type === "application/pdf" || file.type.startsWith("image/");
    if (!isValidType) {
      message.error("You can only upload PDF or image files!");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File must be smaller than 5MB!");
      return false;
    }
    return false; // Prevent auto upload, handle manually
  };

  return { beforeUpload };
};
