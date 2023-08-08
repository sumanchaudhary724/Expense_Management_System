import express from "express";
import moment from "moment";
import {
  addTransections,
  getTransections,
  deleteTransections,
  updateTransections,
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
    const { frequency } = req.body;
    const transections = await getTransections({
      date: {
        $gt: moment().subtract(Number(frequency), "M").toDate(),
      },
      userid: req.body.userid,
    });
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

// Update a transaction
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedTransaction = await updateTransections(id, data);

    if (updatedTransaction) {
      res.json({
        status: "success",
        message: "Transaction updated successfully",
        transections: updatedTransaction,
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
      message: "Error updating the transaction",
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
