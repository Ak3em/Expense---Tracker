import React, { useState } from "react";

export default function AddExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ title, amount: parseFloat(amount), category });
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <button type="submit">Add Expense</button>
    </form>
  );
}
