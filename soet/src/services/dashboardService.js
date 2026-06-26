import api from "./api";

const dashboardService = {

  getStudentDashboard:
  async () => {

    const response =
      await api.get(
        "/dashboard/student"
      );

    return response.data;
  },

  getFacultyDashboard:
  async () => {

    const response =
      await api.get(
        "/dashboard/faculty"
      );

    return response.data;
  },

  getAdminDashboard:
  async () => {

    const response =
      await api.get(
        "/dashboard/admin"
      );

    return response.data;
  }

};

export default dashboardService;