import api from "./axiosConfig";

export const createDoctorApi = (payload) => {
  return api.post("/clinic-admin/create-doctor", payload);
};

export const createReceptionistApi = (payload) => {
  return api.post("/clinic-admin/create-receptionist", payload);
};

export const createPatientApi = (payload) => {
  return api.post("/clinic-admin/create-patient", payload);
};

export const getDoctorsApi = () => {
  return api.get("/clinic-admin/doctors");
};

export const getPatientsApi = () => {
  return api.get("/clinic-admin/patients");
};
