import api from "./axiosConfig";

export const createClinicApi = (payload) => {
  return api.post("/clinic/create-clinic", payload);
};

export const createClinicAdminApi = (payload) => {
  return api.post("/clinic/create-clinic-admin", payload);
};

export const getClinicsApi = () => {
  return api.get("/clinic/all");
};
