import connectDb from "./config/connectDb.js";
import userRouter from "./routes/userRoute.js";
import transectionRouter from "./routes/transectionRoute.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { authenticateUser } from "./middlewares/authMiddleware.js";

// config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//port
const PORT = 8080 || process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

//For testing
app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});

// app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", userRouter);

app.use("/api/v1/transections", authenticateUser, transectionRouter);

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server running well",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server running at http://localhost:${PORT}`);
});
