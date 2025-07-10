import { useState } from "react";
import { message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";

export const useAvatarUpload = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      let url: string;
      if (info.file.response?.url) {
        url = info.file.response.url;
      } else if (info.file.originFileObj) {
        url = URL.createObjectURL(info.file.originFileObj);
      } else {
        console.error("Could not get a URL for the uploaded file.");
        setLoading(false);
        return;
      }
      setAvatarUrl(url);
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return {
    avatarUrl,
    setAvatarUrl,
    loading,
    handleAvatarChange,
    beforeUpload,
  };
};
