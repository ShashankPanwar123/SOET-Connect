import api from "./api";

const analyticsService = {

  getAnalytics:
  async () => {

    const response =
      await api.get(
        "/analytics"
      );

    return response.data;
  },

  getNoticeStats:
  async () => {

    const response =
      await api.get(
        "/analytics/notices"
      );

    return response.data;
  },

  getUserStats:
  async () => {

    const response =
      await api.get(
        "/analytics/users"
      );

    return response.data;
  }

};

export default analyticsService;