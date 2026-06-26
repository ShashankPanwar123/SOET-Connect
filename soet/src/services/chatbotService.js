import api from "./api";

const chatbotService = {

  askQuestion: async (
    message
  ) => {

    const response =
      await api.post(
        "/chatbot",
        {
          query: message
        }
      );

    return response.data;
  }

};

export default chatbotService;