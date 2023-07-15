import axios from "axios";

const rootAPI = "http://localhost:8080";
const userAPI = rootAPI + "/api/v1/user";

// ====== user
export const postUser = async (userData) => {
  try {
    const { data } = await axios.post(userAPI, userData);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
