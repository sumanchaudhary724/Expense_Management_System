import mongoose from "mongoose";

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required and should be unique"],
      uniquie: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

//export
export default mongoose.model("users", userSchema); //users
