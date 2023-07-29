import transectionSchema from "./transectionSchema.js";

export const addTransections = (obj) => {
  return transectionSchema(obj).save();
};

export const getTransections = () => {
  return transectionSchema.find();
};

export const updateTransections = (_id, data) => {
  return transectionSchema.findByIdAndUpdate(_id, data);
};

export const deleteTransections = (_id) => {
  return transectionSchema.findByIdAndDelete(_id);
};
