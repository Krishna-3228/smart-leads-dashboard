import api from "./axios";

export const createUserByAdmin =
  async (
    data: {
      name: string;
      email: string;
      password: string;
      role: string;
    }
  ) => {

    const response =
      await api.post(
        "/admin/users",
        data
      );

    return response.data;
  };

export const getUsersForAdmin =
  async () => {
    const response =
      await api.get(
        "/admin/users"
      );

    return response.data;
  };

export const deleteUserByAdmin =
  async (id: string) => {
    const response =
      await api.delete(
        `/admin/users/${id}`
      );

    return response.data;
  };