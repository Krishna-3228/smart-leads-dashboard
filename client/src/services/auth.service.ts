import api from "../api/axios";

export const loginUser = async (
  data: {
    email: string;
    password: string;
  }
) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const registerUser = async (
  data: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post("/upload/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};