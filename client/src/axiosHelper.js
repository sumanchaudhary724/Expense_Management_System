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

export const getAllTransections = async () => {
  try {
    const { data } = await axios.get(transectionAPI + "/get-transection");

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getFilterTransection = async () => {
  try {
    const response = await axios.post(transectionAPI + "/filter");
    return response.data;
  } catch (error) {
    console.error("Error filtering transactions:", error);
  }
};

export const deleteTransections = async (_id) => {
  try {
    const { data } = await axios.delete(transectionAPI + "/" + _id);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTransections = async (_id, data) => {
  try {
    const response = await axios.put(transectionAPI + "/" + _id, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
