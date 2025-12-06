import api from "./axiosConfig";

export const loginApi = (email, password) => {
  return api.post("/auth/login", { email, password });
};
