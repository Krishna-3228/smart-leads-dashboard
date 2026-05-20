import api from "../api/axios";

export const getDashboardStats =
  async () => {
    const response = await api.get(
      "/leads",
      {
        params: {
          page: 1,
          limit: 1000,
        },
      }
    );

    return response.data;
  };