import axios from "axios";

const rootAPI = "http://localhost:8080";
const userAPI = rootAPI + "/api/v1/users";
const transectionAPI = rootAPI + "/api/v1/transections";

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

export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(userAPI + "/login", userData);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTransection = async (obj) => {
  try {
    const { data } = await axios.post(transectionAPI + "/add-transection", obj);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
