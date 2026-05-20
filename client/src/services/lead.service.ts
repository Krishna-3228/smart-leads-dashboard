import api from "../api/axios";

export const getLeads = async (
  params?: {
    search?: string;
    status?: string;
    source?: string;
    sort?: string;
    page?: number;
  }
) => {
  const response = await api.get(
    "/leads",
    {
      params,
    }
  );

  return response.data;
};