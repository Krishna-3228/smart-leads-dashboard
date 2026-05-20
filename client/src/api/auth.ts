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
        "/users",
        data
      );

    return response.data;
  };