import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post(
      "/auth/login",
      credentials
    );

    return response.data;
  },

  register: async (userData) => {
    const response = await api.post(
      "/auth/register",
      userData
    );

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const user =
      localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(
      "token"
    );
  },
};

export default authService;