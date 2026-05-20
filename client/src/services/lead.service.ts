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

export const getLeadById = async (
  id: string
) => {
  const response = await api.get(
    `/leads/${id}`
  );

  return response.data;
};

export const updateLead = async (
  id: string,
  data: {
    name: string;
    email: string;
    status: string;
    source: string;
  }
) => {
  const response = await api.put(
    `/leads/${id}`,
    data
  );

  return response.data;
};

export const deleteLead = async (
  id: string
) => {
  const response = await api.delete(
    `/leads/${id}`
  );

  return response.data;
};