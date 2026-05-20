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

export const createLead = async (
  data: {
    name: string;
    email: string;
    source: string;
  }
) => {
  const response = await api.post(
    "/leads",
    data
  );

  return response.data;
};