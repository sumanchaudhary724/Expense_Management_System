import express from "express";
import {
  addTransections,
  getAllTransections,
  deleteTransections,
  updateTransections,
  getFilterTransections,
} from "../models/transectionModel.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a new transaction
router.post("/add-transection", async (req, res) => {
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

// Get all transactions-------
// Assuming you have the necessary imports and middleware set up for your router

// Assuming you have some sort of authentication mechanism and you can access the logged-in user's ID from the request object

// Assuming you have middleware that extracts the user ID from the request
// Implement the middleware in your router
router.get("/get-transection", authenticateUser, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Assuming the user ID is accessible via req.user._id
    const transections = await getAllTransections(loggedInUserId);
    res.json({
      status: "success",
      message: "Transaction list for logged-in user",
      transections,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// POST transactions with filters
router.get("/api/v1/transections/get-transections/filter", async (req, res) => {
  try {
    const { frequency, type, startDate, endDate } = req.body;

    // Build the query based on the provided filters
    const query = {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    if (type !== "all") {
      query.type = type;
    }

    const transactions = await getFilterTransections();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
