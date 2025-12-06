import api from "./axiosConfig";

export const createAppointmentApi = (payload) => {
  return api.post("/appointment/create", payload);
};

export const getClinicAppointmentsApi = () => {
  return api.get("/appointment/clinic");
};

export const updateAppointmentStatusApi = (payload) => {
  return api.put("/appointment/update-status", payload);
};
