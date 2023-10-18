import Transection from "./transectionSchema.js";

export const addTransections = async (obj) => {
  const newTransaction = new Transection(obj);
  return newTransaction.save();
};

export const getAllTransections = async (userid) => {
  return Transection.find({ userid: userid });
};

export const getFilterTransections = async (query) => {
  return Transection.find(query);
};

export const updateTransections = async (_id, data) => {
  return Transection.findByIdAndUpdate(_id, data, { new: true });
};

export const deleteTransections = async (_id) => {
  return Transection.findByIdAndDelete(_id);
};

export const getTransactionsForLoggedInUser = async () => {
  // Implement the logic to get the logged-in user's ID
  const loggedInUserId = "your_logged_in_user_id"; // Replace this with your logic to get the logged-in user's ID
  return Transection.find({ userid: loggedInUserId });
};
