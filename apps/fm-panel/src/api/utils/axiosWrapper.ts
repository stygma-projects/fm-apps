import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: { authRequired: boolean }) => {
  const authStore = useAuthStore();
  if (config.authRequired && authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    }
    return Promise.reject(error);
  },
);

export default {
  get(url, params = {}, authRequired = false) {
    return axiosInstance.get(url, { params, authRequired });
  },
  post(url, data, authRequired = false) {
    return axiosInstance.post(url, data, { authRequired });
  },
  put(url, data, authRequired = false) {
    return axiosInstance.put(url, data, { authRequired });
  },
  delete(url, authRequired = false) {
    return axiosInstance.delete(url, { authRequired });
  },
};
