import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔐 GLOBAL AUTH ERROR HANDLING
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔴 Force logout on auth failure
      localStorage.removeItem("auth");

      // Redirect cleanly
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;