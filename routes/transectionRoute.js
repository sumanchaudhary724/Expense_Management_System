import express from "express";
import {
  addTransections,
  getTransections,
} from "../models/transectionModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await addTransections(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New Transections has been added",
        })
      : res.json({
          status: "error",
          message: "Error, unable to add the transection, try again later",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const transections = await getTransections();
    res.json({
      status: "success",
      message: "Transection list",
      transections,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
