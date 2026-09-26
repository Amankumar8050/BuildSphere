import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPendingCertificates = async () => {
  const response = await api.get("/certificates/pending");
  return response.data;
};

export const getCertificateById = async (certificateId) => {
  const response = await api.get(`/certificates/${certificateId}`);
  return response.data;
};

export const updateCertificateStatus = async (
  certificateId,
  status
) => {
  const response = await api.patch(
    `/certificates/${certificateId}/status`,
    { status }
  );

  return response.data;
};

export const extractCertificateMetadata = async (
  certificateId
) => {
  const response = await api.post(
    `/ai/certificates/${certificateId}/extract`
  );

  return response.data;
};

export default api;