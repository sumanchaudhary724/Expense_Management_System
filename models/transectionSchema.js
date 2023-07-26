import mongoose from "mongoose";
const transectionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "desc is required"],
    },
    date: {
      type: String,
      required: [true, "data is required"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Transections", transectionSchema);
