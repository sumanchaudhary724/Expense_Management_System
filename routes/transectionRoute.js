import express from "express";
import {
  addTransections,
  getTransections,
  deleteTransections,
} from "../models/transectionModel.js";

const router = express.Router();

// Add a new transaction
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

// Get all transactions
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

// Delete a transaction
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await deleteTransections(id);

    if (deletedTransaction) {
      res.json({
        status: "success",
        message: "Transaction deleted successfully",
        transaction: deletedTransaction,
      });
    } else {
      res.json({
        status: "error",
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "Error deleting the transaction",
    });
  }
});

export default router;
