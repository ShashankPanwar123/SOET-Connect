import api from "./api";

const noticeService = {

  getNotices: async (
    search = "",
    category = "",
    page = 1
  ) => {

    const response = await api.get(
      "/notices",
      {
        params: {
          search,
          category,
          page
        }
      }
    );

    return response.data;
  },

  getNoticeById: async (id) => {

    const response = await api.get(
      `/notices/${id}`
    );

    return response.data;
  },

  createNotice: async (
    noticeData
  ) => {

    const response = await api.post(
      "/notices",
      noticeData
    );

    return response.data;
  },

  updateNotice: async (
    id,
    noticeData
  ) => {

    const response = await api.put(
      `/notices/${id}`,
      noticeData
    );

    return response.data;
  },

  deleteNotice: async (id) => {

    const response = await api.delete(
      `/notices/${id}`
    );

    return response.data;
  },

  classifyNotice: async (
    content
  ) => {

    const response = await api.post(
      "/notices/classify",
      {
        content
      }
    );

    return response.data;
  }

};

export default noticeService;