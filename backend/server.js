import express from "express";
import cors from "cors";
import { openDB } from "./db/database.js";
import expensesRouter from "./routes/expenses.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/expenses", expensesRouter);

app.get("/", (req, res) => {
  res.send("✅ Expense Tracker API running! Use /expenses");
});

// Initialize database and create table if it doesn't exist
async function initDB() {
  const db = await openDB();
  await db.run(
    `CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount REAL,
      category TEXT
    )`
  );
}

initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
