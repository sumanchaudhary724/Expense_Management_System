import connectDb from "./config/connectDb.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
