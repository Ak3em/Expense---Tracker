import express from "express";
import { openDB } from "../db/database.js";

const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  const db = await openDB();
  const expenses = await db.all("SELECT * FROM expenses ORDER BY id DESC");
  res.json(expenses);
});

// Add a new expense
router.post("/", async (req, res) => {
  const { title, amount, category } = req.body;
  const db = await openDB();
  const result = await db.run(
    "INSERT INTO expenses (title, amount, category) VALUES (?, ?, ?)",
    [title, amount, category]
  );
  const expense = await db.get("SELECT * FROM expenses WHERE id = ?", result.lastID);
  res.json(expense);
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await openDB();
  await db.run("DELETE FROM expenses WHERE id = ?", [id]);
  res.json({ message: "Expense deleted" });
});

export default router;
