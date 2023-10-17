import transectionSchema from "./transectionSchema.js";

export const addTransections = (obj) => {
  return transectionSchema(obj).save();
};
export const getAllTransections = async (userid) => {
  return transectionSchema.find(userid);
};
export const getFilterTransections = async (query) => {
  return transectionSchema.find(query);
};

export const updateTransections = (_id, data) => {
  return transectionSchema.findByIdAndUpdate(_id, data);
};

export const deleteTransections = (_id) => {
  return transectionSchema.findByIdAndDelete(_id);
};
